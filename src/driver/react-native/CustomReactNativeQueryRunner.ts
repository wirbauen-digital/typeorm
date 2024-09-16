// Courtesy by: https://gist.github.com/aigoncharov/556f8c61d752eff730841170cd2bc3f1
import { CustomReactNativeDriver } from "./CustomReactNativeDriver"
import { ReactNativeQueryRunner } from "./ReactNativeQueryRunner"

import { MutexInterface } from "async-mutex"

export class CustomReactNativeQueryRunner extends ReactNativeQueryRunner {
  private _releaseMutex: MutexInterface.Releaser | null
  driver: CustomReactNativeDriver

  constructor(driver: CustomReactNativeDriver) {
    super(driver)
    this._releaseMutex = null
  }

  async startTransaction(): Promise<void> {
    this._releaseMutex = await this.driver.mutex.acquire()
    return super.startTransaction()
  }

  async commitTransaction(): Promise<void> {
    if (!this._releaseMutex) {
      throw new Error(
        "[TypeORM] CustomReactNativeQueryRunner.commitTransaction -> mutex releaser unknown",
      )
    }
    await super.commitTransaction()
    this._releaseMutex()
    this._releaseMutex = null
  }

  async rollbackTransaction(): Promise<void> {
    if (!this._releaseMutex) {
      throw new Error(
        "[TypeORM] CustomReactNativeQueryRunner.rollbackTransaction -> mutex releaser unknown",
      )
    }
    await super.rollbackTransaction()
    this._releaseMutex()
    this._releaseMutex = null
  }

  async connect(): Promise<any> {
    if (!this.isTransactionActive) {
      const release = await this.driver.mutex.acquire()
      release()
    }
    return super.connect()
  }
}

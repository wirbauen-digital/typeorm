import { Mutex } from "async-mutex"
import { DataSource } from "../../data-source"
import { QueryRunner } from "../../query-runner/QueryRunner"
import { ReplicationMode } from "../types/ReplicationMode"
import { CustomReactNativeQueryRunner } from "./CustomReactNativeQueryRunner"
import { ReactNativeDriver } from "./ReactNativeDriver"

export class CustomReactNativeDriver extends ReactNativeDriver {
  mutex: Mutex
  constructor(connection: DataSource) {
    super(connection)
    this.mutex = new Mutex()
    console.log("[TypeORM] Custom React Native Driver created")
  }
  /**
   * Creates a query runner used to execute database queries.
   */
  createQueryRunner(mode: ReplicationMode): QueryRunner {
    if (!this.queryRunner) {
      this.queryRunner = new CustomReactNativeQueryRunner(this)
    }

    return this.queryRunner
  }
}

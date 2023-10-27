import { BaseDataSourceOptions } from "../../data-source/BaseDataSourceOptions"

/**
 * Sqlite-specific connection options.
 */
export interface ReactNativeConnectionOptions extends BaseDataSourceOptions {
    /**
     * Database type.
     */
    readonly type: "react-native" | "custom-react-native"

    /**
     * Database name.
     */
    readonly database: string

    /**
     * The driver object
     * This defaults to require("react-native-quick-sqlite")
     */
    readonly driver?: any

    /**
     * Storage Location
     */
    readonly location: string

    readonly poolSize?: never
}

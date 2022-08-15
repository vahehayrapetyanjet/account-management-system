

export enum SeverityTypes {
    Error = 'error',
    Warning = 'warning',
    Info = 'info'
}

export const HTTP_ERRORS = {
    VALIDATION_FAILED: {
        message: 'sysError_validation_failed',
        severity: SeverityTypes.Error
    },
    USER_NOT_FOUND: {
        message: 'sysError_user_not_found',
        severity: SeverityTypes.Error
    },
    INTERNAL_SERVER_ERROR: {
        message: 'sysError_server_error',
        severity: SeverityTypes.Error
    },
};

export const ACCOUNT_DEFAULT = {
    BALANCE: 0,
    TYPE: 1,
    ACTIVE: true,
    DELAY_WITH_DRAWAL_LIMIT: 1000,
};
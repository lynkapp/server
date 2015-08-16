package be.lynk.server.util.message;

/**
 * Created by florian on 11/11/14.
 */
public enum ErrorMessageEnum {

    WRONG_AUTHORIZATION("--.error.wrong_authorization"),
    NOT_CONNECTED("--.error.not_connected"),
    EMAIL_ALREADY_USED("--.error.email_already_used"),
    FATAL_ERROR("--.error.fatal_error"),
    JSON_CONVERSION_ERROR("--.error.json_conversion_error"),
    VALIDATION_SIZE("--.error.validation.size"),
    VALIDATION_NOT_NULL("--.error.validation.not_null"),
    VALIDATION_PATTERN("--.error.validation.pattern"),
    VALIDATION_EMAIL("--.error.validation.email"),
    VALIDATION_PASSWORD("--.error.validation.password"),
    NOT_YOUR_OLD_PASSWORD("--.error.wrong_old_password"),
    FACEBOOK_AUTHENTICATION_FAIL("--.error.facebook.authentication_fail"),
    WRONG_PASSWORD_OR_LOGIN("--.error.wrong_password_or_login"),
    FACEBOOK_FUSION_DIFFERENT_ACCOUNT_TYPE("--.error.facebookFusion.differentAccountType"),
    FACEBOOK_NOT_ACCOUNT_FOUND("--.error.facebook.notAccountFound"),
    EMAIL_UNKNOWN("--.error.account.emailUnknown"),
    ACCOUNT_WITHOUT_LOGIN_CREDENTIAL("--.error.account.withoutLoginCredential"),
    GOOGLE_MAP_ERROR("--.error.googleMap"),
    WRONG_ADDRESS("--.error.wrongAddress"),
    BUSINESS_MUST_BE_PUBLISHED("--.error.business.mustBePublished"),
    SEARCH_WRONG_CRITERIA("--.error.search.wrongCriteria"),
    WRONG_ADDRESS_NAME_ALREADY_USED("--.error.address.nameAlreadyUsed"),
    WRONG_ADDRESS_NAME("--.error.address.nameNotExists"),
    WRONG_OLD_PASSWORD("--.error.address.wrongOldPassword");

    private final String key;

    ErrorMessageEnum(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

}

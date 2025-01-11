export const USER_REGEX=/^[A-Za-z]{4,20}(?:[ '-][A-Za-z]{1,20})*$/
    ;
export const PWD_REGEX = /^.{6,24}$/;
;

// export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
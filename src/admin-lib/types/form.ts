export type Validator<TVal,> = {value: TVal; message?: string} | TVal;

export type RequiredValidator =  Validator<boolean>;
export type PatternValidator = Validator<RegExp>;
export type ValidateValidator = Validator<(value: string) => boolean>;

export type Validators<TBody extends Record<string, string | Blob> = Record<string, string | Blob>> = Record<
    keyof TBody,
    {
        required?: RequiredValidator,
        pattern?: PatternValidator,
        validate?: ValidateValidator;
    }
>;

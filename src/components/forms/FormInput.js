import React from 'react';
import { Controller } from 'react-hook-form';
import { Form, Input, Label } from 'semantic-ui-react';

// Custom form input component that integrates React Hook Form with Semantic UI
export const FormInput = ({
  name,
  control,
  rules,
  label,
  labelPosition = 'left',
  placeholder,
  type = 'text',
  icon,
  iconPosition,
  defaultValue = '',
  ...inputProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Field error={!!error}>
          <Input
            {...field}
            {...inputProps}
            label={label}
            labelPosition={labelPosition}
            placeholder={placeholder}
            type={type}
            icon={icon}
            iconPosition={iconPosition}
          />
          {error && (
            <Label pointing prompt>
              {error.message}
            </Label>
          )}
        </Form.Field>
      )}
    />
  );
};

// Semantic UI styled input similar to LabelInputField from react-semantic-redux-form
export const LabeledFormInput = ({
  name,
  control,
  rules,
  label,
  labelPosition = 'left',
  placeholder,
  type = 'text',
  defaultValue = '',
  ...inputProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <Form.Field error={!!error}>
          <Input
            {...field}
            {...inputProps}
            label={label}
            labelPosition={labelPosition}
            placeholder={placeholder}
            type={type}
          />
          {error && (
            <Label pointing prompt>
              {error.message}
            </Label>
          )}
        </Form.Field>
      )}
    />
  );
};

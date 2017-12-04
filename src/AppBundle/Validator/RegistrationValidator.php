<?php

namespace AppBundle\Validator;

class RegistrationValidator
{
    private $errors = [];

    public function validate($value)
    {
        $this->validateName($value['firstname'], 'firstname')
            ->validateName($value['lastname'], 'lastname')
            ->validateUsername($value['username'])
            ->validateEmail($value['email'])
            ->validatePasswords($value['plainPassword']['first'], $value['plainPassword']['second']);

        return $this->errors;
    }

    public function validatePasswords($plainpasword, $repeatedpassword)
    {
        if ($plainpasword !== $repeatedpassword) {
            $this->errors['password'] = "Pass should match!";
        }

        return $this;
    }

    public function validateEmail($email)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->errors['email'] = "Email should have a form!";
        }

        return $this;
    }

    private function validateUsername($username)
    {
        $username = trim($username);
        if (empty($username)) {
            $this->errors['username'] = 'The username must not be empty!';

            return $this;
        }
        if (strlen($username) <= 2) {
            $this->errors['username'] = 'The username should contain at least 3 characters!';

            return $this;
        }
        if (!preg_match('/^[A-Za-z0-9-_]+$/', $username)) {
            $this->errors['username'] = "Username should contain letters, numbers and _ or - !";
        }

        return $this;
    }

    private function validateName($value, $name)
    {
        $value = trim($value);
        if (empty($value)) {
            $this->errors[$name] = "The $name must not be empty!";

            return $this;
        }
        if (strlen($value) <= 2) {
            $this->errors[$name] = "The $name should contain at least 3 characters!";

            return $this;
        }
        if (!preg_match('/^[A-Za-z][A-Za-z\- ]+[A-Za-z]$/', $value)) {
            $this->errors[$name] = "The $name should contain only letters, spaces and minus between two letters!";
        }

        return $this;
    }
}
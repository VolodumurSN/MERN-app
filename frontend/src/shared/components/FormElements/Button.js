import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import s from './Button.module.scss';

const Button = ({
  inverse,
  danger,
  size,
  href,
  children,
  to,
  exact,
  type,
  onClick,
  disabled,
  className,
}) => {
  if (href) {
    return (
      <a
        className={cx(
          s.button,
          { [s.buttonInverse]: inverse },
          { [s.buttonDanger]: danger },
          s[size],
        )}
        href={href}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={cx(
          s.button,
          { [s.buttonInverse]: inverse },
          { [s.buttonDanger]: danger },
          s[size],
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cx(
        s.button,
        { [s.buttonInverse]: inverse },
        { [s.buttonDanger]: danger },
        s[size],
        className,
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

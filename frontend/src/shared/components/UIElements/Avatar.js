import cx from 'classnames';
import React from 'react';
import s from './Avatar.module.scss';
import Image from './Image';

const Avatar = ({
  className,
  style,
  image,
  alt,
  width,
  ...props
}) => {
  return (
    <div className={cx(s.avatar, className)} style={style}>
      <Image
        src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
        type="user"
        alt={alt}
        style={{ width: width, height: width }}
      />
    </div>
  );
};

export default Avatar;

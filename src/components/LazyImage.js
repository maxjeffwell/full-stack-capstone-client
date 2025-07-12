import React, { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Visibility, Image, Loader } from 'semantic-ui-react';

const LazyImage = memo(({ src, size = 'tiny', alt, ...imageProps }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const showImage = useCallback(() => {
    setShow(true);
  }, []);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  if (!show) {
    return (
      <Visibility as="span" fireOnMount onOnScreen={showImage}>
        <Loader active inline="centered" size={size} />
      </Visibility>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '10px', textAlign: 'center', color: '#999' }}>
        Failed to load image
      </div>
    );
  }

  return (
    <>
      {loading && <Loader active inline="centered" size={size} />}
      <Image
        {...imageProps}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          display: loading ? 'none' : 'block',
          ...imageProps.style,
        }}
      />
    </>
  );
});

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

LazyImage.displayName = 'LazyImage';

export default LazyImage;

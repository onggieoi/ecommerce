import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { styled } from 'baseui';
import { UploadIcon } from '../AllSvgIcon';
import _ from 'lodash';

const Text = styled('span', ({ $theme }) => ({
  ...$theme.typography.font14,
  fontFamily: $theme.typography.primaryFontFamily,
  color: $theme.colors.textDark,
  marginTop: '15px',
  textAlign: 'center',
}));

const TextHighlighted = styled('span', ({ $theme }) => ({
  color: $theme.colors.primary,
  fontWeight: 'bold',
}));

const Container = styled('div', ({ props }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  borderWidth: '2px',
  borderRadius: '2px',
  borderColor: '#E6E6E6',
  borderStyle: 'dashed',
  backgroundColor: '#ffffff',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border 0.24s ease-in-out',
  cursor: 'pointer',
}));

const ThumbsContainer = styled('aside', () => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: '16px',
}));

const Thumb = styled('div', ({ $theme }) => ({
  ...$theme.borders.borderEA,
  display: 'inline-flex',
  borderRadius: '2px',
  marginBottom: '8px',
  marginRight: '8px',
  width: '100px',
  height: '100px',
  padding: '4px',
  boxSizing: 'border-box',
}));

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  position: 'relative',
};

const x: React.CSSProperties = {
  position: 'absolute', fontWeight: 'bold', top: '-4px', right: '2px', textDecoration: 'none'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

type UploaderProps = {
  onChange: Function;
  name?: string;
  imageURL?: any;
  isMultiple?: boolean;
  onChangeInitImage?: Function;
}

const Uploader: React.FC<UploaderProps> = ({
  onChange, name, imageURL, isMultiple = false, onChangeInitImage
}) => {
  const isMultipleInit = _.isArray(imageURL);
  const isUpdating = !_.isUndefined(onChangeInitImage);

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: isMultiple,
    onDrop: useCallback(
      acceptedFiles => {
        setFiles(
          acceptedFiles.map(file => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          }
          )
        );

        if (!isMultipleInit && isUpdating) {
          onChangeInitImage("");
        }

        onChange(acceptedFiles);
      },
      [isMultipleInit, isUpdating, onChange, onChangeInitImage]
    ),
  });

  const handleRemove = (e, id) => {
    e.preventDefault();

    setFiles(files.filter(f => f.preview !== id));
  }

  const handleRemoveInitialImg = (e, id) => {
    e.preventDefault();

    if (!isMultipleInit) {
      onChangeInitImage("");
      return;
    }

    onChangeInitImage(imageURL.filter(img => img.id !== id));
  }

  const thumbs = files.map(file => (
    <Thumb key={file.name}>
      <div style={thumbInner}>
        <a href="" onClick={e => handleRemove(e, file.preview)} style={x}>x</a>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </Thumb>
  ));

  const initialImg = imageURL ? !isMultipleInit ? (
    <Thumb>
      <div style={thumbInner}>
        <a href="" onClick={e => handleRemoveInitialImg(e, imageURL)} style={x}>x</a>
        <img src={imageURL} style={img} />
      </div>
    </Thumb>
  ) : imageURL.map(img => (
    <Thumb key={img.id}>
      <div style={thumbInner}>
        <a href="" onClick={e => handleRemoveInitialImg(e, img.id)} style={x}>x</a>
        <img src={img.url} style={img} />
      </div>
    </Thumb>
  )) : null;

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container uploader">
      <Container {...getRootProps()}>
        <input name={name} {...getInputProps()} />
        <UploadIcon />
        <Text>
          <TextHighlighted>Drag/Upload</TextHighlighted> your image here.
        </Text>
      </Container>
      {thumbs && (
        <ThumbsContainer>
          {initialImg && <>{initialImg}</>}
          <div>{thumbs}</div>
        </ThumbsContainer>)}
    </section>
  );
}

export default Uploader;

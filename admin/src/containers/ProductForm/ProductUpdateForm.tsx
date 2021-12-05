import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDrawerDispatch, useDrawerState } from '../../context/DrawerContext';
import Uploader from '../../components/Uploader/Uploader';
import Button, { KIND } from '../../components/Button/Button';
import DrawerBox from '../../components/DrawerBox/DrawerBox';
import { Row, Col } from '../../components/FlexBox/FlexBox';
import Input from '../../components/Input/Input';
import { Textarea } from '../../components/Textarea/Textarea';
import Select from '../../components/Select/Select';
import { FormFields, FormLabel } from '../../components/FormFields/FormFields';

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from '../DrawerItems/DrawerItems.style';
import { Product } from '../../models/product';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks';
import { getCategories } from '../../redux/category/categoryReducer';
import { createProduct, getProducts, ProductRequest } from '../../redux/product/productReducer';
import { resizeFileToBlob } from '../../helpers/resizeImage';
import { notification } from '../../helpers';
import InlineLoader from '../../components/InlineLoader';

type Props = any;

const AddProduct: React.FC<Props> = () => {
  const dispatch = useDrawerDispatch();
  const data: Product = useDrawerState('data');
  const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
    dispatch,
  ]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data,
  });

  const [type, setType] = useState([{
    value: data.category.id,
    name: data.category.name,
    label: data.category.name
  }]);
  const [description, setDescription] = useState(data.description);
  const [img, setImg] = useState(data.image);
  const [gallery, setGallerry] = useState(data.gallery);


  React.useEffect(() => {
    register({ name: 'id' });
    register({ name: 'categoryId' });
    register({ name: 'image' });
    register({ name: 'gallery' });
    register({ name: 'description' });
    register({ name: 'imageFile' });
    register({ name: 'galleryImages' });

    setValue('categoryId', data.category.id);
    setValue('id', data.id);

  }, [data.category.id, data.id, register, setValue]);

  const { categories } = useAppSelector(state => state.categoryReducer);
  const { loading } = useAppSelector(state => state.productReducer);
  const reduxDispatch = useAppDispatch();

  useEffect(() => {
    reduxDispatch(getCategories())
  }, [reduxDispatch]);


  const handleDescriptionChange = e => {
    const value = e.target.value;
    setValue('description', value);
    setDescription(value);
  };

  const handleTypeChange = ({ value }) => {
    setValue('categoryId', value[0].value);
    setType(value);
  };

  const handleUploader = files => {
    setValue('imageFile', files);
  };

  const handleChangeImg = img => {
    setValue('image', img);
    setImg("");
  };

  const handleChangeGallery = imgs => {
    setValue('gallery', imgs);
    setGallerry(imgs);
  };

  const handleGalleryImagesUploader = files => {
    setValue('galleryImages', files.map(file => file));
  };

  const onSubmit = async data => {
    const request: ProductRequest = {
      ...data
    };

    if (data.imageFile) {
      request.imageFile = await resizeFileToBlob(data.imageFile[0]);
    }

    if (data.galleryImages) {
      const rezireAllImage = data.galleryImages.map(img => resizeFileToBlob(img));

      request.galleryImages = await Promise.all(rezireAllImage);
    }

    reduxDispatch(createProduct({
      request,
      callback: callback,
    }));
  };

  const callback = (type: string, message) => {
    reduxDispatch(getProducts({
      page: 1,
    }));

    closeDrawer();
    notification(type, 'Updated' + message);
  }

  return (
    <>
      {loading && <InlineLoader />}

      <DrawerTitleWrapper>
        <DrawerTitle>Update Product</DrawerTitle>
      </DrawerTitleWrapper>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ height: '100%' }}
        noValidate
      >
        <Scrollbars
          autoHide
          renderView={props => (
            <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
          )}
          renderTrackHorizontal={props => (
            <div
              {...props}
              style={{ display: 'none' }}
              className="track-horizontal"
            />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Product description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Title</FormLabel>
                  <Input
                    inputRef={register({ required: true, maxLength: 20 })}
                    name="title"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input type="text" inputRef={register} name="unit" />
                </FormFields>

                <FormFields>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    inputRef={register({ required: true })}
                    name="price"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input type="number" inputRef={register} name="salePrice" />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input
                    type="number"
                    inputRef={register}
                    name="discountInPercent"
                  />
                </FormFields>

                <FormFields>
                  <FormLabel>Product Quantity</FormLabel>
                  <Input type="number" inputRef={register} name="quantity" />
                </FormFields>

                <FormFields>
                  <FormLabel>Category</FormLabel>
                  <Select
                    options={categories.map(({ name, id }) => ({
                      name,
                      label: name,
                      value: id,
                    }))}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Product Type"
                    value={type}
                    searchable={false}
                    onChange={handleTypeChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected
                              ? $theme.colors.textDark
                              : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </FormFields>

              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <FieldDetails>Thumbnail</FieldDetails>
              <DrawerBox>
                <Uploader onChange={handleUploader} imageURL={img} onChangeInitImage={handleChangeImg} />
              </DrawerBox>

              <FieldDetails>Gallery</FieldDetails>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: '100%',
                      height: 'auto',
                      padding: '30px',
                      borderRadius: '3px',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                }}
              >
                <Uploader
                  onChange={handleGalleryImagesUploader}
                  isMultiple
                  imageURL={gallery}
                  onChangeInitImage={handleChangeGallery}
                />
              </DrawerBox>
            </Col>
          </Row>

        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                  marginRight: '15px',
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: '50%',
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  borderBottomLeftRadius: '3px',
                }),
              },
            }}
          >
            Update Product
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;

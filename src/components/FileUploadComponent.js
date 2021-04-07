import React, { useRef, useState } from 'react';
import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel
} from "./FileUploadComponent.styles";
import PropTypes from "prop-types";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 1000000;
const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);
const convertNestedObjectToArray = (nestedObj) => 
  Object.keys(nestedObj).map((key) => nestedObj[key]);
// destructuring otherProps: ...
function FileUploadComponent(props) {
  let exceedFileSize = false;
  const {label, updateFilesCb, ...otherProps} = props
  // useState functions returns 2 vars: the current state and a function that lets you update it
  // Hooks are functions that let you hook into React State and lifecycle features
  const [files, setFiles] = useState({});
  // The useRef hook returns a mutable ref object whose .current property refers to a DOM node (FormField tag in this case).
  const fileInputField = useRef(null);
  const maxFilesSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES;
  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  }
  const handleNewFileUpload = (e) => {
    const {files: newFiles } = e.target;
    console.log(e.target);
    console.log(newFiles);
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  }
  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFilesSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = files;
      } else {
        exceedFileSize = true;
      }
    }
    return { ...files }
  }
  const removeFile = (filename) => {
    delete files[filename];
    setFiles({...files });
    callUpdateFilesCb({...files });
    exceedFileSize = false;
  };
  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray)
  }
  
  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag and drop your file anywhere or</DragDropText>
        <UploadFileBtn
          type="button"
          onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>
      {/*second part starts here*/}
      <FilePreviewContainer>
        <span>{ exceedFileSize ? "File too big" :  "Upload Preview"}</span>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            let file = files[fileName];
            let isImageFile = file.type.split("/")[0] === "image";
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {isImageFile && (
                    <ImagePreview
                      src={URL.createObjectURL(file)}
                      alt={`file preview ${index}`}
                    />
                  )}
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon
                        className="fas fa-trash-alt"
                        onClick={() => removeFile(file.name)}
                      />
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  )
}
FileUploadComponent.propTypes = {
  label: PropTypes.string.isRequired,
  updateFilesCb: PropTypes.func.isRequired,
  otherProps: PropTypes.any
};

export default FileUploadComponent
import React, { useCallback, CSSProperties } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import MaterialUITable from "./MaterialUITable";

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      uploaded
      name
      rangeStart
      rangeEnd
      account
      transactions {
        account
        type
        datePosted
        transId
        name
        memo
        amount
      }
    }
  }
`;

const centralDivStyle: CSSProperties = {
  minHeight: 100,
  backgroundColor: "#fbff8a",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "#450d85",
  textAlign: "center",
  marginBottom: 20,
};

const ImportFile: React.FC = () => {
  const [uploadFile, { data }] = useMutation(uploadFileMutation);

  const onDrop = useCallback(
    async ([file]) => {
      try {
        await uploadFile({ variables: { file } });
      } catch (err) {
        console.log(err);
      }
    },
    [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={centralDivStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p style={{ color: "black" }}>Drop the files here ...</p>
        ) : (
          <p style={{ color: "black" }}>
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>

      {data && data.uploadFile && (
        <div>
          <hr />
          <h3>File Data</h3>
          <p>File Name: {data.uploadFile.name}</p>
          <p>
            Date Range:{" "}
            {`${data.uploadFile.rangeStart} - ${data.uploadFile.rangeEnd}`}
          </p>
          <hr />
          <MaterialUITable transactions={data.uploadFile.transactions} />
        </div>
      )}
    </div>
  );
};

export default ImportFile;

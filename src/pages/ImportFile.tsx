import React, { useCallback, CSSProperties } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import MaterialUITable from "../Components/MaterialUITable";
import moment from "moment";
import { Box, Button } from "@material-ui/core";
import { TransactionInput, Transaction } from "../generated/graphql";

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

const submitTransactionsMutation = gql`
  mutation SubmitTransactions($transactions: [TransactionInput!]!) {
    submitTransactions(transactions: $transactions)
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
  const [uploadFile, { data, error, loading }] = useMutation(
    uploadFileMutation
  );
  const [submitTransactions] = useMutation(submitTransactionsMutation);

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

  const handleSubmitTransactions = () => {
    console.log(data.uploadFile.transactions);
    const trans: Transaction[] = data.uploadFile.transactions;
    let transNoTypename: TransactionInput[] = trans.map((obj: Transaction) => ({
      transId: obj.transId,
      account: obj.account,
      type: obj.type,
      datePosted: obj.datePosted,
      name: obj.name,
      memo: obj.memo,
      amount: obj.amount,
    }));

    submitTransactions({ variables: { transactions: transNoTypename } }).then(
      ({ data, errors }) => {
        console.log("submit trans data: ", data);
        if (errors) {
          console.log("error", errors);
        }
      }
    );
  };
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
      {loading && <div>Loading...</div>}

      {data && data.uploadFile && (
        <div>
          <hr />
          <Box display="flex" flexDirection="row">
            <Box>
              <h3>File Data</h3>
              <p>File Name: {data.uploadFile.name}</p>
              <p>
                Date Range:{" "}
                {`${moment(data.uploadFile.rangeStart, "YYYYMMDD").format(
                  "MMM Do YYYY"
                )} - ${moment(data.uploadFile.rangeEnd, "YYYYMMDD").format(
                  "MMM Do YYYY"
                )}`}
              </p>
            </Box>
            <Box marginRight="3" flexGrow="1" ml={30} p={1}>
              <p>Submit this file?</p>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleSubmitTransactions}
              >
                Submit
              </Button>
            </Box>
          </Box>

          <hr />
          <MaterialUITable transactions={data.uploadFile.transactions} />
        </div>
      )}

      {error && <div>{error.message}</div>}
    </div>
  );
};

export default ImportFile;

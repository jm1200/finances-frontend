import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import MaterialUITable from "../Components/MaterialUITable";
import moment from "moment";
import {
  Box,
  Button,
  makeStyles,
  createStyles,
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { TransactionEntity, TransactionClass } from "../generated/graphql";
//import { Transaction } from "../types";
import { useSnackbar } from "notistack";

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!, $book: String!) {
    uploadFile(file: $file, book: $book) {
      uploaded
      name
      rangeStart
      rangeEnd
      account
      transactions {
        id
        account
        book
        type
        categoryId
        subCategoryId
        savedCategoryId
        datePosted
        name
        memo
        amount
        userId
      }
    }
  }
`;

const submitTransactionsMutation = gql`
  mutation SubmitTransactions($transactions: [TransactionInput!]!) {
    submitTransactions(transactions: $transactions) {
      inserted
      message
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    options: {
      display: "flex",
      alignItems: "center",
      height: 110,
      marginBottom: 20,
    },
    bookSelect: {
      display: "flex",
      flexDirection: "column",
    },
    formControl: {
      marginRight: 15,
      minWidth: 250,
    },
    centralDivStyle: {
      height: "100%",
      backgroundColor: "#fbff8a",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "#450d85",
      textAlign: "center",

      width: "70%",
    },
  })
);

const ImportFile: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [book, setBook] = React.useState("Home");

  const [uploadFile, { data, error, loading }] = useMutation(
    uploadFileMutation
  );

  const [submitTransactions] = useMutation(submitTransactionsMutation);

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setBook(event.target.value as string);
  };

  const onDrop = useCallback(
    async ([file]) => {
      try {
        await uploadFile({ variables: { file, book } });
      } catch (err) {
        console.log(err);
      }
    },
    [uploadFile, book]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmitTransactions = () => {
    const trans: TransactionEntity[] = data.uploadFile.transactions;
    console.log("IF119: ", trans[0]);
    let transNoTypename: TransactionClass[] = trans.map(
      (obj: TransactionEntity) => ({
        id: obj.id,
        userId: obj.userId,
        book: obj.book,
        account: obj.account,
        type: obj.type,
        datePosted: obj.datePosted,
        name: obj.name,
        memo: obj.memo,
        savedCategoryId: obj.savedCategoryId,
        amount: obj.amount,
        categoryId: obj.categoryId,
        subCategoryId: obj.subCategoryId,
      })
    );

    console.log("IF 94: ", transNoTypename[0]);

    submitTransactions({ variables: { transactions: transNoTypename } }).then(
      ({ data, errors }) => {
        if (
          data &&
          data.submitTransactions &&
          data.submitTransactions.inserted
        ) {
          enqueueSnackbar(data.submitTransactions.message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(data.submitTransactions.message, {
            variant: "error",
          });
        }
      }
    );
  };
  return (
    <div>
      <div className={classes.options}>
        <div className={classes.bookSelect}>
          <p>Add Transactions to book:</p>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="book">Select book:</InputLabel>
            <Select
              labelId="bookSelect"
              id="bookSelectId"
              value={book}
              onChange={handleChange}
            >
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value={"377 Hyde Park Rd."}>377 Hyde Park Rd.</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div {...getRootProps()} className={classes.centralDivStyle}>
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
      </div>
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
            <Box marginRight="3" ml={30} p={1}>
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

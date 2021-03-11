import React from 'react';
import {
    Link,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    wrapper: {
        marginTop: '30px'
    },
    alertLink: {
        marginLeft: '20px'
    }
});

const LinksList = ({links}) => {
    const classes = useStyles();
    if (links.length === 0) return (
        <>
            <Alert severity="info">
                No links yet
                <Link className={classes.alertLink} color='primary' href={`/create`}>Create</Link>
            </Alert>
        </>
    )

    return (
        <TableContainer component={Paper} className={classes.wrapper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Original Link</TableCell>
                        <TableCell align="left">Short link</TableCell>
                        <TableCell align="left"> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {links.map(link => (
                        <TableRow key={link._id}>
                            <TableCell component="th" scope="row">
                                <Link href={link.from} rel="nofollow noopener" target="_blank"> {link.from}</Link>
                            </TableCell>
                            <TableCell align="left">
                                <Link href={link.to} rel="nofollow noopener" target="_blank"> {link.to}</Link>
                            </TableCell>
                            <TableCell align="left">
                                <Button color='primary' href={`/detail/${link._id}`}>Details</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LinksList;

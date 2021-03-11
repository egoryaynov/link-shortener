import React from 'react';
import {useParams} from "react-router";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/auth.context";
import {CircularProgress} from "@material-ui/core";
import LinkCard from "../components/LinkCard";
import Alert from "@material-ui/lab/Alert";

const DetailPage = () => {
    const {token} = React.useContext(AuthContext)
    const [link, setLink] = React.useState(null)
    const {request, isLoading, error} = useHttp()
    const linkId = useParams().id

    const getLink = React.useCallback(async () => {
        try {
            const data = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLink(data)
        } catch (e) {

        }
    }, [token, linkId, request])

    React.useEffect(() => {
        getLink()
    }, [getLink])

    if (isLoading) return <CircularProgress color="secondary"/>

    return (
        <>
            {!isLoading && link && <LinkCard link={link}/>}
            {error && <Alert severity="error">{error}</Alert>}
        </>
    )
};

export default DetailPage;

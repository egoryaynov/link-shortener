import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/auth.context";
import {CircularProgress} from "@material-ui/core";
import LinksList from "../components/LinksList";

const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {isLoading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const data = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(data)
        } catch (e) {

        }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (isLoading) return <CircularProgress color="secondary"/>

    return (
        <>
            {!isLoading && <LinksList links={links}/>}
        </>
    );
};

export default LinksPage;

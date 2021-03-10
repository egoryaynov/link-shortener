import React from 'react';
import TextField from "@material-ui/core/TextField";
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/auth.context";
import {useHistory} from "react-router";

const CreatePage = () => {
    const auth = React.useContext(AuthContext)
    const {request} = useHttp()
    const history = useHistory()
    const [link, setLink] = React.useState('')

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })

                history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    return (
        <div>
            <TextField
                style={{marginTop: '30px'}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your link"
                name="email"
                autoComplete="email"
                autoFocus
                value={link}
                onKeyPress={pressHandler}
                onChange={event => setLink(event.target.value)}
            />
        </div>
    );
};

export default CreatePage;

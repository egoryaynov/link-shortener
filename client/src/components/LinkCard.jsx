import React from 'react';
import {Link, Typography} from "@material-ui/core";

const LinkCard = ({link}) => {
    console.log(link)
    return (
        <div style={{marginTop: '30px'}}>
            <Typography variant="h4">Detail info about link</Typography>
            <Typography variant="body1" style={{marginTop: '15px'}}>
                Your link:
                <Link href={link.from} rel="nofollow noopener" target="_blank"> {link.from}</Link>
            </Typography>
            <Typography variant="body1" style={{marginTop: '15px'}}>
                Short link:
                <Link href={link.to} rel="nofollow noopener" target="_blank"> {link.to}</Link>
            </Typography>
            <Typography variant="body1" style={{marginTop: '15px'}}>
                Clicks count: {link.clicks}
            </Typography>
        </div>
    );
};

export default LinkCard;

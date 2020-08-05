import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from "./loader";

const Details = React.memo(({ detailData }) => {
    const [data, setData] = useState("")

    useEffect(() => {
        console.log("detailData--------->>", detailData)
        setData(detailData)
    }, [detailData])

    return (
        <div>
            {data ? (
                <div >
                    <h3>{data.title}</h3>
                    <iframe src={data.url} title={data.title} width="1000" height="700">
                    </iframe>
                </div>
            ) : <Loader />}

            <div>
                <Link to='/'> <button className="btn btn-outline-success mb-2">Back</button> </Link>
            </div>
        </div>
    );
});

const mapStateToProps = ({ DataList }) => {
    return {
        detailData: DataList.detailData,
    };
};

export default connect(mapStateToProps, {})(Details);
import { useState, useEffect } from 'react';
import axios from 'axios';

const EXPRESS_URL = 'http://localhost:3010';

function VtuberTable() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const updatedVtubers = await axios.get(EXPRESS_URL + '/mysql-data')
            setItems(updatedVtubers.data);
        };
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>no.</th>
                    <th>이미지</th>
                    <th>이름</th>
                    <th>링크</th>
                    <th>소속사</th>
                    <th>설명</th>
                </tr>
            </thead>
            <tbody>
                {items.map((vtuber, i) => (
                    <tr key={i}>
                        <td>{vtuber.vtuber_id}</td>
                        {
                            vtuber.img == null ? (
                                <td />
                            ) : (
                                <td>
                                    <img
                                        src={`${process.env.PUBLIC_URL}/vtuber_icon/${vtuber.vtuber_id}.jpg`}
                                        alt="이미지"
                                    />
                                </td>
                            )
                        }

                        <td>{vtuber.name}</td>
                        <td>{vtuber.link}</td>
                        <td>{vtuber.company || '개인세'}</td>
                        <td>{vtuber.vtuber_detail}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default VtuberTable;

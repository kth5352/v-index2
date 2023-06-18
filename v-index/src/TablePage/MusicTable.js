import { useState, useEffect } from 'react';
import axios from 'axios';

const EXPRESS_URL = 'http://localhost:3010';

function MusicTable() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const updatedMusics = await axios.get(EXPRESS_URL + '/music-data')
            setItems(updatedMusics.data);
        };
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>no.</th>
                    <th>이미지</th>
                    <th>제목</th>
                    <th>링크</th>
                    <th>가수</th>
                </tr>
            </thead>
            <tbody>
                {items.map((music, i) => (
                    <tr key={i}>
                        <td>{music.music_id}</td>
                        {
                            <td>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/music_icon/${music.music_id}.jpg`}
                                    alt="이미지"
                                />
                            </td>
                        }

                        <td>{music.name}</td>
                        <td><a href={music.music_link} target="_blank" rel="noopener noreferrer">{music.music_link}</a></td>
                        <td>{music.vtuber}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MusicTable;

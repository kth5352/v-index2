import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const EXPRESS_URL = 'http://localhost:3010';

function MusicTable() {
    const [items, setItems] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        vtuber_id: '',
        image: '0',
        music_link: '',
        music_id: null, // Add music_id to the formData state
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${EXPRESS_URL}/music-data`);
            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${EXPRESS_URL}/music-data`);
                setItems(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        let deleteUrl = `${EXPRESS_URL}/music-data/delete/${id}`;
        axios
            .delete(deleteUrl)
            .then((response) => {
                console.log("삭제 성공");
                const updatedItems = items.filter((music) => music.music_id !== id);
                setItems(updatedItems);
            })
            .catch((error) => {
                console.log("삭제 실패");
                console.error(error);
            });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleDialogClose();

        const updateUrl = `${EXPRESS_URL}/music-data/update/${formData.music_id}`;
        axios
            .put(updateUrl, formData)
            .then((response) => {
                console.log("업데이트 성공");
                fetchData();
            })
            .catch((error) => {
                console.log("업데이트 실패");
                console.error(error);
            });
    };


    const handleDialogOpen = (music_id) => {
        setDialogOpen(true);
        setFormData((prevState) => ({
            ...prevState,
            music_id: music_id,
        }));
    };


    const handleDialogClose = () => {
        setDialogOpen(false);
        setFormData({
            name: '',
            vtuber_id: '',
            image: '0',
            music_link: '',
            music_id: null,
        });
    };

    const handleFormChange = (event) => {
        if (event.target.name === 'image') {
            setFormData((prevData) => ({
                ...prevData,
                [event.target.name]: event.target.value === '0' ? null : event.target.value,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [event.target.name]: event.target.value,
            }));
        }
    };


    const onRemove = (music_id) => {
        if (window.confirm("정말 삭제합니까?")) {
            alert("삭제 되었습니다.");
            handleDelete(music_id);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>no.</th>
                        <th>이미지</th>
                        <th>제목</th>
                        <th>링크</th>
                        <th>가수</th>
                        <th>기능</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((music, i) => (
                        <tr key={i}>
                            <td>{music.music_id}</td>
                            <td>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/music_icon/${music.music_id}.jpg`}
                                    alt="이미지"
                                />
                            </td>
                            <td>{music.name}</td>
                            <td>
                                <a href={music.music_link} target="_blank" rel="noopener noreferrer">
                                    {music.music_link}
                                </a>
                            </td>
                            <td>{music.vtuber}</td>
                            <td>
                                <button className="custom-btn btn-1" onClick={() => handleDialogOpen(music.music_id)}>Update</button>
                                <button className="custom-btn btn-1" onClick={() => onRemove(music.music_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Update</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleFormSubmit}>
                        <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="vtuber_id"
                                        name="vtuber_id"
                                        value={formData.vtuber_id}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="music_link"
                                        name="music_link"
                                        value={formData.music_link}
                                        onChange={handleFormChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <button type="submit">Update</button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MusicTable;

import { useState, useEffect } from 'react';
import axios from 'axios';


import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const EXPRESS_URL = 'http://localhost:3010';

function ConfigTable() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        vtuber_id: '',
        vtuber_detail: '',
        vtuber_link: '',
        graduation: '',
        company_id: '',
        image: '',
        link: '',
        company_name: '',
        music_link: '',
    });
    const [vtuberData, setVtuberData] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [musicData, setMusicData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const vtuberResponse = await axios.get(`${EXPRESS_URL}/vtuber`);
            setVtuberData(vtuberResponse.data);

            const companyResponse = await axios.get(`${EXPRESS_URL}/company`);
            setCompanyData(companyResponse.data);

            const musicResponse = await axios.get(`${EXPRESS_URL}/music`);
            setMusicData(musicResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDialogOpen = (table) => {
        setSelectedTable(table);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedTable('');
        setFormData({
            name: '',
            vtuber_id: '',
            vtuber_detail: '',
            vtuber_link: '',
            graduation: '',
            company_id: '',
            image: '',
            link: '',
            company_name: '',
            music_link: '',
        });
    };

    const handleFormChange = (event) => {
        if (event.target.name === 'image') {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value === '' ? 'NULL' : event.target.value,
            });
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            });
        }
    };

    // 데이터 추가 함수
    const addData = async (table, data) => {
        try {
            const response = await axios.post(`${EXPRESS_URL}/${table}`, data);
            if (response.data.result === "success") {
                alert("Data added successfully");
            } else {
                alert("Failed to add data");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred");
        }
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (selectedTable === 'vtuber') {
            const formData = {
                name: event.target.name.value,
                vtuber_detail: event.target.vtuber_detail.value,
                vtuber_link: event.target.vtuber_link.value,
                graduation: event.target.graduation.value,
                company_id: event.target.company_id.value,
                image: '0',
            };
            addData(selectedTable, formData);
        } else if (selectedTable === 'company') {
            const formData = {
                name: event.target.name.value,
                link: event.target.link.value,
            };
            addData(selectedTable, formData);
        } else if (selectedTable === 'music') {
            const formData = {
                name: event.target.name.value,
                vtuber_id: event.target.vtuber_id.value,
                music_link: event.target.music_link.value,
                image: '0',
            };
            addData(selectedTable, formData);
        }

        handleDialogClose();
    };

    return (
        <div>
            <div>
                <h1>Configuration Table</h1>
                <button className="button btnFade btnPink" onClick={() => handleDialogOpen('vtuber')}>Add Vtuber</button>
                <button className="button btnFade btnPink" onClick={() => handleDialogOpen('company')}>Add Company</button>
                <button className="button btnFade btnPink" onClick={() => handleDialogOpen('music')}>Add Music</button>
            </div>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Add {selectedTable}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleFormSubmit}>
                        {selectedTable === 'vtuber' && (
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
                                            label="Vtuber Detail"
                                            name="vtuber_detail"
                                            value={formData.vtuber_detail}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Vtuber Link"
                                            name="vtuber_link"
                                            value={formData.vtuber_link}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Graduation"
                                            name="graduation"
                                            value={formData.graduation}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Company ID"
                                            name="company_id"
                                            value={formData.company_id}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {selectedTable === 'company' && (
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
                                            label="link"
                                            name="link"
                                            value={formData.link}
                                            onChange={handleFormChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {selectedTable === 'music' && (
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
                        )}

                        <button type="submit">Add</button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ConfigTable;

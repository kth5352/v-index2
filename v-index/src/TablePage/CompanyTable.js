import { useState, useEffect } from 'react';
import axios from 'axios';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const EXPRESS_URL = 'http://localhost:3010';

function CompanyTable() {
    const [items, setItems] = useState([]);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        link: '',
        Image: '0',
        company_id: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${EXPRESS_URL}/company-data`);
            setItems(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const updatedCompanies = await axios.get(EXPRESS_URL + '/company-data')
            setItems(updatedCompanies.data);
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        let deleteUrl = `${EXPRESS_URL}/company-data/delete/${id}`;
        axios
            .delete(deleteUrl)
            .then((response) => {
                console.log("삭제 성공");
                // 삭제 후에 필요한 작업을 수행합니다.
                // 예를 들어, 데이터를 다시 불러오거나 화면을 갱신할 수 있습니다.
                const updatedItems = items.filter((company) => company.company_id !== id);
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

        const updateUrl = `${EXPRESS_URL}/company-data/update/${formData.company_id}`;
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


    const handleDialogOpen = (company_id) => {
        setDialogOpen(true);
        setFormData((prevState) => ({
            ...prevState,
            company_id: company_id,
        }));
    };


    const handleDialogClose = () => {
        setDialogOpen(false);
        setFormData({
            name: '',
            vtuber_id: '',
            image: '0',
            company_link: '',
            company_id: null,
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

    const onRemove = (company_id) => {

        if (window.confirm("정말 삭제합니까?")) {
            //확인 버튼을 누르면 삭제 쿼리 실행
            alert("삭제 되었습니다.");

            handleDelete(company_id);
        }

    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>no.</th>
                        <th>이름</th>
                        <th>링크</th>
                        <th>기능</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((company, i) => (
                        <tr key={i}>
                            <td>{company.company_id}</td>
                            <td>{company.name}</td>
                            <td><a href={company.link} target="_blank" rel="noopener noreferrer">{company.link}</a></td>
                            <td>
                                <button className="custom-btn btn-1" onClick={() => handleDialogOpen(company.company_id)}>Update</button>
                                <button class="custom-btn btn-1" onClick={() => onRemove(company.company_id)}>Delete</button>
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
                                        label="link"
                                        name="link"
                                        value={formData.link}
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

export default CompanyTable;

import { useState, useEffect } from 'react';
import axios from 'axios';

const EXPRESS_URL = 'http://localhost:3010';

function CompanyTable() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const updatedCompanies = await axios.get(EXPRESS_URL + '/company-data')
            setItems(updatedCompanies.data);
        };
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>no.</th>
                    <th>이름</th>
                    <th>링크</th>
                </tr>
            </thead>
            <tbody>
                {items.map((company, i) => (
                    <tr key={i}>
                        <td>{company.company_id}</td>
                        <td>{company.name}</td>
                        <td><a href={company.link} target="_blank" rel="noopener noreferrer">{company.link}</a></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CompanyTable;

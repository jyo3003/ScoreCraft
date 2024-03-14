import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentsByGroup } from '../api';
import '../css/MainPageGroup.css';
import grade from '../images/Grade.png';
import home from '../images/home.png';

const MainPageGroup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsByGroup = async () => {
      try {
        const studentsByGroup = await getStudentsByGroup();
        const groupsWithProperties = studentsByGroup.map(group => ({
          ...group,
          show: false,
          graded: false
        }));
        setGroups(groupsWithProperties);
      } catch (error) {
        console.error("Failed to fetch students by group:", error.message);
      }
    };

    fetchStudentsByGroup();
  }, []);

  const toggleShowStudents = (groupName) => {
    setGroups(currentGroups =>
      currentGroups.map(group => {
        if (group.groupName === groupName) {
          return { ...group, show: !group.show };
        }
        return { ...group, show: false }; // Collapse other rows
      })
    );
  };

  const toggleGraded = (groupName) => {
    setGroups(currentGroups =>
      currentGroups.map(group => {
        if (group.groupName === groupName) {
          return { ...group, graded: !group.graded };
        }
        return group;
      })
    );
  };

  const filteredGroups = groups.filter(group =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="group-header">
        <header className="header">
          <img src={grade} alt="ScoreCraft Logo" className="pencil-logo" />
          <h1>ScoreCraft</h1>
          <button onClick={() => navigate('/')} className="home-button">
            <img src={home} alt="Home Icon" />
          </button>
        </header>
      </div>
      <div className="main-page-group">
        <div className="content-container">
          <div className="group-search-bar">
            <input
              type="text"
              placeholder="Search Groups"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="groups-table">
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Graded</th>
              </tr>
            </thead>
            <tbody>
              {filteredGroups.map(item => (
                <tr key={item.groupName}>
                  <td onClick={() => toggleShowStudents(item.groupName)}>
                    {item.groupName}
                    {item.show && (
                      <>
                        <table className="inner-table">
                          <thead>
                            <tr>
                              <th>Student Name</th>
                              <th>ASURite ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.students.map(student => (
                              <tr key={student.id}>
                                <td>{student.studentName}</td>
                                <td>{student.asurite}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.graded}
                      onChange={() => toggleGraded(item.groupName)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MainPageGroup;
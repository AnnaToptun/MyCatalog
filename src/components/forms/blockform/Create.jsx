import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Tabs, Tab, AppBar, Box} from '@mui/material';
import { CreateCard } from '../CreateCard';
import { CreateGenre } from '../CreateGenre';
import {AddAvtor} from '../AddAvtor';
import '../create.css'
import { a11yProps, TabPanel} from "./TabsPanel";

export const Create = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box className="create-box">
            <AppBar position="static" className="create-appbar">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    className="create-tab"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Додати книгу" {...a11yProps(0)} />
                    <Tab label="Додати автора" {...a11yProps(1)} />
                    <Tab label="Додати жанр" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <CreateCard />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <AddAvtor />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <CreateGenre />
            </TabPanel>
        </Box>
    );
}
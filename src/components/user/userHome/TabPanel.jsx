import {Box} from "@mui/material";

interface TabPanelProps {
    children: React.ReactNode;
    index: number;
    value: number;
}

export const TabPanel = (props: TabPanelProps) => {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
        >
            {value === index && <Box sx={{ p: 0, m: 0 }}>{children}</Box>}
        </div>
  );
}


import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Typography, Box, Button, Link, Grid } from '@mui/material'


const Popup = ({
    darkMode = false,
    userProfile = {},
    activeFont=""
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };
  
  
  
    return (
      <div>
        <Button onClick={openPopup} color= {darkMode ? 'primary' : 'inherit'}>Show Code</Button>
        {isPopupOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: '200px'
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                padding: '10px',
                borderRadius: '5px',
                maxWidth: '80%',
                maxHeight: '70%',
                overflow: 'auto',
              }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button  color="inherit" onClick={closePopup} justifyContent='flex-end' sx={{ zIndex: 1 }}>X</Button>
          </Box>
    
                
               <PopupWithTabs darkMode={darkMode} userProfile={userProfile} activeFont={activeFont}></PopupWithTabs>
              
            </div>
          </div>
        )}
      </div>
    );
  };

const PopupWithTabs = ({darkMode=false, userProfile={}, activeFont=''}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const customSize = {
        fontSize: '12px',
        width: '100%', overflowX: 'auto'
      };


    const [codeSnippet, setCodeSnippet] = useState('');
    const [backendcodeSnippet, setBackendCodeSnippet] = useState('');

    useEffect(() => {
        const fetchCodeSnippet = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/tryretool/retool_external_template/main/frontend/src/components/RetoolWrapper.js');
            const code = await response.text();
            setCodeSnippet(code);
        } catch (error) {
            console.error(error);
        }
        };

        fetchCodeSnippet();
    }, []);

    useEffect(() => {
        const fetchbackendCodeSnippet = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/tryretool/retool_external_template/main/backend/routes/retool.js');
            const code = await response.text();
            setBackendCodeSnippet(code);
        } catch (error) {
            console.error(error);
        }
        };

        fetchbackendCodeSnippet();
    }, []);





    const styles = {
        popup: {
        backgroundColor: '#fff',
        padding: '1rem',
        },
        tabs: {
        marginBottom: '1rem',
        marginTop: '-2.5rem'
        },
        tabPanel: {
        padding: '1rem',
        marginTop: '-3rem'
        },
    };

    const LeftPanel = () => {
        return (
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item>
           
            </Grid>
            <Grid item>
              <Box mt={2} mb={4}>
                <img src="https://i.ibb.co/q0X40S1/Screen-Shot-2023-04-11-at-4-08-18-PM.png" alt="Image" width="100%" />
              </Box>
            </Grid>
          </Grid>
        );
      };
      const RightPanel = ({darkMode = false, activeFont='',userProfile={}}) => {
        return (
            <div>
            <Tabs
            value={value}
            onChange={handleChange}
            style={styles.tabs}
            indicatorColor="secondary"
            textColor="inherit"
            centered
        >
            <Tab label="Client (React)" />
            <Tab label="Portal Backend (Express)" />
        </Tabs>
 
        <TabPanel value={value} index={0} style={styles.tabPanel}>
      <Box >
        <Box display='flex'  >      
            <div  style={{ flex: "1", textAlign: "left" }}>
        darkMode: {darkMode.toString()}
        </div>
        <div  style={{ flex: "1", textAlign: "right" }}>
        activeFont: {activeFont}
        </div>
    </Box>
          <Box justifyItems='right'>
        <SyntaxHighlighter language="jsx"style={darcula} customStyle={customSize} >
        {codeSnippet.trim()}
            
        </SyntaxHighlighter>
        </Box>
        </Box>
        </TabPanel>
        <TabPanel value={value} index={1} style={styles.tabPanel}>
        <Box display='flex' >      
        
        <div style={{ flex: "1", textAlign: "center" }}>
        group: {userProfile?.user?.group}
        </div>
  
    </Box>
       <Box>
        <SyntaxHighlighter language="jsx" style={darcula} customStyle={customSize}>
        {backendcodeSnippet.trim()}
         
        </SyntaxHighlighter>
        </Box>
        </TabPanel>
        </div>
        );
      }; 

    return (
      
        <div style={styles.popup}>
            <Box marginTop='-70px' display='flex' justifyContent='center' padding='1rem' marginBottom='-30px'>
                <div>
                    <p>Below you can see the current state of the application for:</p>
                    <p>1. <code>darkMode</code> and <code>activeFont</code>: variables passed to Retool via a <Link href='https://docs.retool.com/docs/share-retool-apps#pass-data-to-an-embedded-app'style={{ color: '#4169E1' }}>parent window query</Link> to change the appearance of the app. </p>
                    <p>2. <code>group</code>: a variable passed in to the <Link href='https://docs.retool.com/docs/retool-embed-quickstart#post-request-parameters' style={{ color: '#4169E1' }}>Retool Embed API call</Link> as metadata.</p>
                    <p></p>
                    <p> You can also see the code snippets for both the front-end and back-end of the application. To see our public code for this portal, check out our GitHub repository <Link href='https://github.com/tryretool/retool_external_template'  style={{ color: '#4169E1' }}>here.</Link></p>
           </div>
            </Box>
            <Box display="flex">
      <Box flexBasis="35%"  sx={{ flexGrow: 1, flexShrink: 1, width:'35%' }} p={2}>
        <Typography variant="h6" align='center'> Architecture Diagram</Typography>
        <LeftPanel />
      </Box>
      <Box flexBasis="65%" sx={{ flexGrow: 1, flexShrink: 1, width:'65%'}} p={2}>
      <Typography variant="h6" align='center'> Code</Typography>
      <Box paddingTop={5}>
        <RightPanel darkMode={darkMode} activeFont={activeFont} userProfile={userProfile}/>
        </Box>
      </Box>
    </Box>

        
        </div>
    );
};

const TabPanel = props => {
const { children, value, index, style, ...other } = props;

return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
    style={style}
    {...other}
    >
    {value === index && <Box p={3}>{children}</Box>}
    </div>
);
};

export default Popup
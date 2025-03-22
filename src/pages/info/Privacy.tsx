import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider, 
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Link
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  GppGood as GppGoodIcon,
  Lock as LockIcon,
  DataUsage as DataUsageIcon,
  Public as PublicIcon,
  People as PeopleIcon,
  Storage as StorageIcon,
  Delete as DeleteIcon,
  Campaign as CampaignIcon,
  Cookie as CookieIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Privacy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'primary.50', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SecurityIcon fontSize="large" color="primary" sx={{ mr: 2 }} />
          <Typography variant="h4" component="h1">
            Política de Privacidad
          </Typography>
        </Box>
        <Typography variant="subtitle1">
          Última actualización: 1 de marzo de 2023
        </Typography>
      </Paper>
      
      <Typography variant="body1" paragraph>
        En CodeCommunity, valoramos y respetamos tu privacidad. Esta política de privacidad explica cómo recopilamos, utilizamos, compartimos y protegemos tu información cuando utilizas nuestra plataforma y servicios.
      </Typography>
      
      <Typography variant="body1" paragraph>
        Al utilizar CodeCommunity, aceptas las prácticas descritas en esta política. Te recomendamos leerla detenidamente para comprender nuestros compromisos y tus derechos respecto a tus datos personales.
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Índice de Contenidos
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <List dense>
              <ListItem component="a" href="#info-collected">
                <ListItemText primary="1. Información que recopilamos" />
              </ListItem>
              <ListItem component="a" href="#use-info">
                <ListItemText primary="2. Cómo utilizamos tu información" />
              </ListItem>
              <ListItem component="a" href="#sharing-info">
                <ListItemText primary="3. Compartir información" />
              </ListItem>
              <ListItem component="a" href="#data-security">
                <ListItemText primary="4. Seguridad de datos" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <List dense>
              <ListItem component="a" href="#cookies">
                <ListItemText primary="5. Cookies y tecnologías similares" />
              </ListItem>
              <ListItem component="a" href="#your-rights">
                <ListItemText primary="6. Tus derechos de privacidad" />
              </ListItem>
              <ListItem component="a" href="#international">
                <ListItemText primary="7. Transferencias internacionales" />
              </ListItem>
              <ListItem component="a" href="#changes">
                <ListItemText primary="8. Cambios en esta política" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
      
      <Box id="info-collected" sx={{ mb: 4, scrollMarginTop: '100px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DataUsageIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            1. Información que recopilamos
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Recopilamos varios tipos de información para proporcionar y mejorar nuestros servicios:
        </Typography>
        
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell><Typography variant="subtitle2">Categoría</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">Ejemplos</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">Propósito</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Información de cuenta</TableCell>
                <TableCell>Nombre, correo electrónico, contraseña, nombre de usuario</TableCell>
                <TableCell>Administrar tu cuenta, autenticación</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Perfil</TableCell>
                <TableCell>Foto, biografía, habilidades, experiencia, educación</TableCell>
                <TableCell>Personalización, networking</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Contenido generado</TableCell>
                <TableCell>Publicaciones, comentarios, código, proyectos</TableCell>
                <TableCell>Proporcionar servicios de la plataforma</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Uso y análisis</TableCell>
                <TableCell>Páginas visitadas, tiempo en la plataforma, interacciones</TableCell>
                <TableCell>Mejorar servicios, solucionar problemas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Información del dispositivo</TableCell>
                <TableCell>Tipo de dispositivo, navegador, IP, ubicación aproximada</TableCell>
                <TableCell>Seguridad, personalización, análisis</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
        <Typography variant="body1" paragraph>
          También podemos recopilar información si te conectas a través de servicios de terceros como GitHub o Google, incluyendo tu nombre de usuario e información de perfil público de estas plataformas.
        </Typography>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box id="use-info" sx={{ mb: 4, scrollMarginTop: '100px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <VisibilityIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            2. Cómo utilizamos tu información
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Utilizamos la información recopilada para los siguientes propósitos:
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <GppGoodIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Proporcionar y mejorar nuestros servicios" 
              secondary="Crear y mantener tu cuenta, entregar contenido personalizado, y mejorar la calidad de nuestra plataforma."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <GppGoodIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Comunicaciones" 
              secondary="Enviarte notificaciones, actualizaciones, alertas de seguridad, mensajes de soporte y comunicaciones administrativas."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <GppGoodIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Personalización" 
              secondary="Personalizar tu experiencia, incluyendo recomendaciones de cursos, contenido y conexiones potenciales con otros usuarios."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <GppGoodIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Seguridad" 
              secondary="Detectar, prevenir y abordar problemas técnicos, seguridad, fraude y actividades potencialmente prohibidas o ilegales."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <GppGoodIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Análisis y mejora" 
              secondary="Entender cómo utilizas nuestra plataforma para mejorar las funcionalidades existentes y desarrollar nuevas características."
            />
          </ListItem>
        </List>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box id="sharing-info" sx={{ mb: 4, scrollMarginTop: '100px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PeopleIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            3. Compartir información
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          No vendemos tus datos personales a terceros. Compartimos información en las siguientes circunstancias:
        </Typography>
        
        <Accordion elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Con otros usuarios</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" paragraph>
              La información de tu perfil, publicaciones, comentarios y código compartido públicamente será visible para otros usuarios según tu configuración de privacidad.
            </Typography>
            <Typography variant="body2">
              Puedes ajustar qué información es pública desde tu configuración de privacidad.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Con proveedores de servicios</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" paragraph>
              Trabajamos con empresas que nos ayudan a operar, mantener y mejorar nuestra plataforma. Estos proveedores tienen acceso limitado a tu información y están contractualmente obligados a usarla solo para los servicios específicos que nos proporcionan.
            </Typography>
            <Typography variant="body2">
              Ejemplos incluyen proveedores de alojamiento, procesamiento de pagos, análisis y atención al cliente.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Para cumplimiento legal</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Podemos divulgar información si creemos de buena fe que es necesario para:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="• Cumplir con una obligación legal, proceso judicial o solicitud gubernamental" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Proteger los derechos, propiedad o seguridad de CodeCommunity, nuestros usuarios o el público" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Detectar, prevenir o abordar fraude, problemas técnicos o de seguridad" />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        
        <Accordion elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">En transacciones corporativas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Si CodeCommunity se involucra en una fusión, adquisición, reorganización o venta de activos, tu información puede ser transferida como parte de esa transacción. Notificaremos sobre cualquier cambio en la propiedad o el uso de tu información personal.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box id="data-security" sx={{ mb: 4, scrollMarginTop: '100px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LockIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            4. Seguridad de datos
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Implementamos medidas de seguridad técnicas, administrativas y físicas diseñadas para proteger la información que recopilamos:
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LockIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Protección técnica
                </Typography>
              </Box>
              <Typography variant="body2">
                Utilizamos encriptación SSL/TLS para todas las transmisiones de datos, almacenamiento encriptado para información sensible y sistemas de detección de intrusiones.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Control de acceso
                </Typography>
              </Box>
              <Typography variant="body2">
                Limitamos el acceso a la información personal a los empleados, contratistas y agentes que necesitan conocerla para operar, desarrollar o mejorar nuestra plataforma.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SecurityIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Monitoreo y auditoría
                </Typography>
              </Box>
              <Typography variant="body2">
                Mantenemos sistemas de monitoreo para detectar vulnerabilidades y realizamos auditorías regulares de seguridad para verificar la integridad de nuestras protecciones.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Typography variant="body1" paragraph>
          Aunque implementamos medidas de seguridad robustas, ningún sistema es completamente inmune. En caso de una brecha de seguridad que afecte tu información personal, te notificaremos oportunamente y tomaremos todas las medidas necesarias para mitigar el impacto.
        </Typography>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box id="cookies" sx={{ mb: 4, scrollMarginTop: '100px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CookieIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            5. Cookies y tecnologías similares
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Utilizamos cookies y tecnologías similares para recopilar información sobre cómo interactúas con nuestra plataforma y permitir ciertas funcionalidades:
        </Typography>
        
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell><Typography variant="subtitle2">Tipo</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">Propósito</Typography></TableCell>
                <TableCell><Typography variant="subtitle2">Duración</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Esenciales</TableCell>
                <TableCell>Autenticación, seguridad, funcionalidades básicas</TableCell>
                <TableCell>Sesión - 1 año</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Preferencias</TableCell>
                <TableCell>Recordar configuraciones y preferencias</TableCell>
                <TableCell>1 año</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Analíticas</TableCell>
                <TableCell>Entender patrones de uso y mejorar la plataforma</TableCell>
                <TableCell>2 años</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Marketing</TableCell>
                <TableCell>Personalizar anuncios y medir su efectividad</TableCell>
                <TableCell>90 días</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
        <Typography variant="body1" paragraph>
          Puedes gestionar tus preferencias de cookies a través de la configuración de tu navegador o utilizando nuestro panel de preferencias de cookies. Ten en cuenta que bloquear ciertas cookies puede afectar la funcionalidad de nuestra plataforma.
        </Typography>
        
        <Button variant="outlined" size="small">
          Gestionar preferencias de cookies
        </Button>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box id="your-rights" sx={{ mb: 4, scrollMarginTop: '100px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PeopleIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            6. Tus derechos de privacidad
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Dependiendo de tu ubicación, puedes tener ciertos derechos relacionados con tu información personal:
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>
                Acceso
              </Typography>
              <Typography variant="body2">
                Derecho a solicitar una copia de tu información personal que mantenemos.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>
                Rectificación
              </Typography>
              <Typography variant="body2">
                Derecho a corregir información personal inexacta o incompleta.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>
                Eliminación
              </Typography>
              <Typography variant="body2">
                Derecho a solicitar la eliminación de tu información personal (con ciertas excepciones).
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" gutterBottom>
                Restricción
              </Typography>
              <Typography variant="body2">
                Derecho a limitar el procesamiento de tu información personal.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Typography variant="body1" paragraph>
          Para ejercer estos derechos, puedes:
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <StorageIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Usar las opciones de configuración de la cuenta disponibles en tu perfil" />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <DeleteIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Solicitar la eliminación de la cuenta en Configuración > Privacidad" />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CampaignIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Contactar a nuestro equipo de privacidad" 
              secondary="privacy@codecommunity.com"
            />
          </ListItem>
        </List>
        
        <Typography variant="body1" paragraph>
          Responderemos a todas las solicitudes dentro de los plazos legales aplicables (normalmente 30 días). En determinadas circunstancias, es posible que necesitemos solicitar información adicional para verificar tu identidad.
        </Typography>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box id="international" sx={{ mb: 4, scrollMarginTop: '100px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PublicIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            7. Transferencias internacionales
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          CodeCommunity opera globalmente y puede transferir, almacenar y procesar tu información en diferentes países:
        </Typography>
        
        <Typography variant="body1" paragraph>
          • Tus datos pueden ser transferidos a países con leyes de protección de datos diferentes a las de tu país de residencia.
        </Typography>
        
        <Typography variant="body1" paragraph>
          • Implementamos salvaguardas apropiadas, como cláusulas contractuales estándar aprobadas por autoridades de protección de datos relevantes, para garantizar que tus datos estén adecuadamente protegidos en cualquier lugar donde se procesen.
        </Typography>
        
        <Typography variant="body1" paragraph>
          • Al utilizar nuestra plataforma, aceptas la transferencia, almacenamiento y procesamiento de tu información en diferentes jurisdicciones según lo descrito en esta política.
        </Typography>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box id="changes" sx={{ mb: 4, scrollMarginTop: '100px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DataUsageIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            8. Cambios en esta política
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Podemos actualizar esta política de privacidad periódicamente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Si realizamos cambios materiales, te notificaremos a través de un aviso prominente en nuestra plataforma, por correo electrónico o por otros medios antes de que los cambios entren en vigor.
        </Typography>
        
        <Typography variant="body1" paragraph>
          Te recomendamos revisar esta política periódicamente para mantenerte informado sobre cómo protegemos tu información.
        </Typography>
      </Box>
      
      <Divider sx={{ my: 4 }} />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Contáctanos
        </Typography>
        
        <Typography variant="body1" paragraph>
          Si tienes preguntas, inquietudes o solicitudes relacionadas con esta política de privacidad o el procesamiento de tu información personal, contáctanos en:
        </Typography>
        
        <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
          <Typography variant="body1" gutterBottom>
            <strong>Responsable de Privacidad</strong>
          </Typography>
          <Typography variant="body1" gutterBottom>
            CodeCommunity, Inc.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Correo electrónico: privacy@codecommunity.com
          </Typography>
          <Typography variant="body1">
            Dirección: 123 Tech Plaza, Ciudad Tecnológica, 12345
          </Typography>
        </Paper>
      </Box>
      
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" href="/privacy/download-pdf">
          Descargar Política de Privacidad (PDF)
        </Button>
      </Box>
    </Container>
  );
};

export default Privacy; 
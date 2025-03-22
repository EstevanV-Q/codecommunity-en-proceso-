import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Paper,
  Button,
  Link
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  QuestionAnswer as QuestionAnswerIcon,
  AccountCircle as AccountCircleIcon,
  Code as CodeIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  School as SchoolIcon,
  Forum as ForumIcon,
  Build as BuildIcon
} from '@mui/icons-material';

// Categorías para las preguntas frecuentes
const categories = [
  { id: 'all', label: 'Todas', icon: <QuestionAnswerIcon /> },
  { id: 'account', label: 'Cuenta', icon: <AccountCircleIcon /> },
  { id: 'platform', label: 'Plataforma', icon: <BuildIcon /> },
  { id: 'courses', label: 'Cursos', icon: <SchoolIcon /> },
  { id: 'community', label: 'Comunidad', icon: <ForumIcon /> },
  { id: 'coding', label: 'Programación', icon: <CodeIcon /> },
  { id: 'billing', label: 'Facturación', icon: <PaymentIcon /> },
  { id: 'security', label: 'Seguridad', icon: <SecurityIcon /> }
];

// Preguntas frecuentes por categoría
const faqItems = [
  {
    id: 1,
    category: 'account',
    question: '¿Cómo puedo cambiar mi contraseña?',
    answer: 'Para cambiar tu contraseña, ve a "Configuración > Seguridad", introduce tu contraseña actual y luego la nueva contraseña dos veces. Haz clic en "Guardar cambios" para confirmar. Recibirás un correo electrónico confirmando el cambio de contraseña.'
  },
  {
    id: 2,
    category: 'account',
    question: '¿Cómo puedo actualizar mi información de perfil?',
    answer: 'Puedes actualizar tu perfil en la sección "Mi Perfil". Haz clic en el botón "Editar Perfil" y modifica los campos que desees actualizar. No olvides guardar los cambios al finalizar. Tu perfil público mostrará la información que decidas compartir.'
  },
  {
    id: 3,
    category: 'account',
    question: '¿Puedo vincular mis cuentas de redes sociales?',
    answer: 'Sí, puedes vincular tus cuentas de GitHub, LinkedIn y otras plataformas. Ve a "Configuración > Cuentas Vinculadas" y sigue las instrucciones para cada plataforma. Esto facilitará compartir tu trabajo y conectar con otros profesionales.'
  },
  {
    id: 4,
    category: 'platform',
    question: '¿Qué navegadores son compatibles con CodeCommunity?',
    answer: 'CodeCommunity es compatible con las versiones recientes de Chrome, Firefox, Safari y Edge. Para una mejor experiencia, recomendamos mantener tu navegador actualizado. Algunas características avanzadas del editor de código pueden funcionar mejor en Chrome y Firefox.'
  },
  {
    id: 5,
    category: 'platform',
    question: '¿La plataforma tiene aplicaciones móviles?',
    answer: 'Actualmente ofrecemos una versión web responsiva que funciona bien en dispositivos móviles. Estamos desarrollando aplicaciones nativas para iOS y Android que estarán disponibles próximamente. La versión móvil permite acceder a cursos y foros, pero el editor de código está optimizado para uso en escritorio.'
  },
  {
    id: 6,
    category: 'courses',
    question: '¿Cómo puedo obtener un certificado al completar un curso?',
    answer: 'Los certificados se generan automáticamente al completar todas las lecciones y aprobar los exámenes finales de un curso. Puedes descargar tus certificados desde la sección "Mis Certificados" en tu perfil. Estos certificados incluyen un código QR verificable y se pueden compartir directamente en LinkedIn.'
  },
  {
    id: 7,
    category: 'courses',
    question: '¿Puedo acceder a los cursos sin conexión a Internet?',
    answer: 'Algunos contenidos de los cursos están disponibles para descarga y visualización sin conexión desde nuestra aplicación de escritorio. Sin embargo, para realizar ejercicios prácticos, tests y recibir feedback, necesitarás conexión a Internet. El contenido descargado se sincronizará con tu progreso cuando vuelvas a conectarte.'
  },
  {
    id: 8,
    category: 'community',
    question: '¿Cómo puedo contribuir al foro de la comunidad?',
    answer: 'Puedes participar en el foro creando nuevos temas de discusión o respondiendo a preguntas existentes. Asegúrate de revisar las normas de la comunidad antes de publicar. Las contribuciones de calidad te ayudarán a ganar reputación y desbloquear privilegios adicionales en la plataforma.'
  },
  {
    id: 9,
    category: 'community',
    question: '¿Existe un sistema de mentoría en la plataforma?',
    answer: 'Sí, ofrecemos un programa de mentoría donde puedes conectar con desarrolladores experimentados. Ve a la sección "Mentoría" para explorar perfiles de mentores disponibles según tu área de interés. Las sesiones pueden ser gratuitas o de pago, dependiendo del mentor.'
  },
  {
    id: 10,
    category: 'coding',
    question: '¿Puedo ejecutar cualquier tipo de código en el editor integrado?',
    answer: 'Nuestro editor soporta múltiples lenguajes de programación incluyendo JavaScript, Python, Java, C++, Ruby y PHP, entre otros. Sin embargo, hay limitaciones de recursos y tiempo de ejecución para garantizar la seguridad y rendimiento. Para proyectos más complejos, recomendamos conectar con repositorios externos.'
  },
  {
    id: 11,
    category: 'coding',
    question: '¿Puedo conectar mi repositorio de GitHub a la plataforma?',
    answer: 'Sí, puedes conectar tus repositorios de GitHub, GitLab o Bitbucket a tu cuenta. Esto te permite trabajar en tus proyectos directamente desde nuestra plataforma y compartir fácilmente tu código con la comunidad o en tus proyectos de curso.'
  },
  {
    id: 12,
    category: 'billing',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express), PayPal, y en algunos países ofrecemos opciones de pago locales. Para suscripciones empresariales, también aceptamos transferencias bancarias. Todos los pagos se procesan de forma segura a través de proveedores certificados.'
  },
  {
    id: 13,
    category: 'billing',
    question: '¿Puedo cambiar de plan o cancelar mi suscripción en cualquier momento?',
    answer: 'Sí, puedes cambiar o cancelar tu suscripción en cualquier momento desde la sección "Suscripción" en tu configuración. Si cancelas, mantendrás el acceso hasta el final del período facturado. No hay penalizaciones por cancelación y puedes reactivar tu suscripción cuando lo desees.'
  },
  {
    id: 14,
    category: 'security',
    question: '¿Cómo protegen mis datos personales?',
    answer: 'Implementamos estrictas medidas de seguridad, incluyendo encriptación de datos, autenticación de dos factores y monitoreo continuo. Nunca compartimos tus datos personales con terceros sin tu consentimiento. Puedes revisar nuestra política de privacidad completa para más detalles sobre cómo manejamos tus datos.'
  },
  {
    id: 15,
    category: 'security',
    question: '¿Qué debo hacer si detecto un problema de seguridad?',
    answer: 'Si encuentras una vulnerabilidad de seguridad, por favor repórtala inmediatamente a security@codecommunity.com. Contamos con un programa de recompensas por bugs que premia a quienes reportan problemas de seguridad legítimos. No intentes explotar vulnerabilidades o acceder a datos de otros usuarios.'
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  // Filtrar preguntas basado en la búsqueda y categoría
  const filteredFaqs = faqItems.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Preguntas Frecuentes
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Encuentra respuestas a las preguntas más comunes sobre CodeCommunity. Si no encuentras lo que buscas, puedes contactar a nuestro equipo de soporte.
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Buscar en las FAQ..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 1, 
          mb: 4,
          alignItems: 'center'
        }}
      >
        <FilterListIcon color="action" />
        <Typography variant="body2" sx={{ mr: 2 }}>
          Filtrar por:
        </Typography>
        
        {categories.map(category => (
          <Chip
            key={category.id}
            label={category.label}
            icon={category.icon}
            onClick={() => handleCategoryChange(category.id)}
            color={activeCategory === category.id ? 'primary' : 'default'}
            variant={activeCategory === category.id ? 'filled' : 'outlined'}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
      
      {filteredFaqs.length > 0 ? (
        <Box>
          {filteredFaqs.map(faq => (
            <Accordion key={faq.id} elevation={0} sx={{ mb: 1, border: '1px solid', borderColor: 'divider' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-${faq.id}-content`}
                id={`faq-${faq.id}-header`}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {categories.find(cat => cat.id === faq.category)?.icon}
                  <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 'medium' }}>
                    {faq.question}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron resultados
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Intenta con otros términos de búsqueda o categoría
          </Typography>
        </Paper>
      )}
      
      <Divider sx={{ my: 6 }} />
      
      <Typography variant="h5" gutterBottom>
        ¿No encuentras lo que buscas?
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ForumIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Pregunta en la Comunidad
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              Nuestra activa comunidad puede ayudarte rápidamente con tus dudas técnicas o sobre la plataforma.
            </Typography>
            <Button variant="outlined" fullWidth href="/community">
              Ir al Foro
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SchoolIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Consulta la Documentación
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              Nuestra documentación detallada contiene guías, tutoriales y referencias técnicas.
            </Typography>
            <Button variant="outlined" fullWidth href="/documentation">
              Ver Documentación
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'primary.50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <QuestionAnswerIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Contacta a Soporte
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, flexGrow: 1 }}>
              Nuestro equipo de soporte está disponible para ayudarte con cualquier problema específico.
            </Typography>
            <Button variant="contained" fullWidth href="/contact">
              Contactar Soporte
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          ¿Tienes alguna sugerencia para mejorar nuestras FAQ?
        </Typography>
        <Link href="/feedback" underline="hover">
          Enviar sugerencia
        </Link>
      </Box>
    </Container>
  );
};

export default FAQ; 
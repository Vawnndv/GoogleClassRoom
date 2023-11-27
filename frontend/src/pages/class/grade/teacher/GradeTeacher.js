import { Box, Button, Container, Typography, Card, CardContent, Divider, Stack, IconButton, Modal, TextField } from '@mui/material'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GradeTable from './GradeTable'
import { useState } from 'react'

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'fullName', label: 'Full Name', minWidth: 170 },
  { id: 'listGrade', label: 'List Grade', minWidth: 170, listGrade: [
    { composition: 'Exercise 1', percent: '10%' },
    { composition: 'Exercise 2', percent: '10%' },
    { composition: 'Midterm', percent: '30%' },
    { composition: 'Finalterm', percent: '50%' }
    // Add more exercises if needed
  ] },
  { id: 'total', label: 'Total', minWidth: 170 }
]

const rows = [
  { id: 1, fullName: 'John Doe', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '25' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '40'
  },
  { id: 2, fullName: 'Jane Smith', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '6' },
    { composition: 'Midterm', percent: '30%', grade: '22' },
    { composition: 'Finalterm', percent: '50%', grade: '45' }
  ], total: '30'
  },
  { id: 3, fullName: 'Bob Johnson', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '5' },
    { composition: 'Exercise 2', percent: '10%', grade: '8' },
    { composition: 'Midterm', percent: '30%', grade: '28' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '30'
  },
  // Add more entries as needed
  { id: 4, fullName: 'Alice Brown', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '9' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '24' },
    { composition: 'Finalterm', percent: '50%', grade: '38' }
  ], total: '30'
  },
  { id: 5, fullName: 'Charlie Davis', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '7' },
    { composition: 'Midterm', percent: '30%', grade: '26' },
    { composition: 'Finalterm', percent: '50%', grade: '42' }
  ], total: '35'
  },
  { id: 6, fullName: 'Eva White', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '23' },
    { composition: 'Finalterm', percent: '50%', grade: '39' }
  ], total: '38'
  },
  { id: 7, fullName: 'David Black', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '6' },
    { composition: 'Exercise 2', percent: '10%', grade: '8' },
    { composition: 'Midterm', percent: '30%', grade: '25' },
    { composition: 'Finalterm', percent: '50%', grade: '37' }
  ], total: '30'
  },
  { id: 8, fullName: 'Grace Lee', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '5' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '27' },
    { composition: 'Finalterm', percent: '50%', grade: '41' }
  ], total: '31'
  },
  { id: 9, fullName: 'Frank Adams', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '8' },
    { composition: 'Exercise 2', percent: '10%', grade: '6' },
    { composition: 'Midterm', percent: '30%', grade: '22' },
    { composition: 'Finalterm', percent: '50%', grade: '36' }
  ], total: '31'
  },
  { id: 10, fullName: 'Helen Taylor', listGrade: [
    { composition: 'Exercise 1', percent: '10%', grade: '7' },
    { composition: 'Exercise 2', percent: '10%', grade: '9' },
    { composition: 'Midterm', percent: '30%', grade: '24' },
    { composition: 'Finalterm', percent: '50%', grade: '40' }
  ], total: '40'
  }
]

function CardGrade ({ title, composition, time, percent }) {
  return (
    <Card
      sx={{
        '&:hover': {
          bgcolor: '#A9A9A9'
        }
      }}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between',
        '&:last-child': {
          p: 0
        }
      }}>
        <Stack direction={'row'} alignItems='center' sx={{ gap: 2 }}>
          <IconButton aria-label="">
            <DragHandleIcon fontSize='large'/>
          </IconButton>
          <Stack>
            <Typography>{title}: <Typography sx={{ display:'inline-block', fontStyle:'italic', fontWeight:'bold' }}>{composition}</Typography></Typography>
            <Typography variant='body-2' sx={{ fontStyle:'italic', color:'rgba(21, 139, 50, 0.7)' }}>{time}</Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'} alignItems='center'>
          <Typography variant='h6' sx={{ fontStyle:'italic', mx: 5 }}>{percent}</Typography>

          <IconButton fontSize='small'><MoreVertOutlinedIcon/></IconButton>
        </Stack>
      </CardContent>
    </Card>
  )
}

function GradeComposition () {
  return (
    <Container sx={{
      borderRadius: 5,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Grade Composition
      </Typography>

      <Stack spacing={1} py={1}>
        <CardGrade title='Dev posted a new assignment' composition='Finalterm' time='12:00' percent='50%' />
        <CardGrade title='Dev posted a new assignment' composition='Midterm' time='12:00' percent='30%' />
        <CardGrade title='Dev posted a new assignment' composition='Exercise 2' time='12:00' percent='10%' />
        <CardGrade title='Dev posted a new assignment' composition='Exercise 1' time='12:00' percent='10%' />

      </Stack>

      <Divider />

      <Container sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <Typography variant='h6'>
          Total grade: <Typography variant='body-2'>
            100%
          </Typography>
        </Typography>
      </Container>

    </Container>
  )
}

function StudentGrade () {
  return (
    <Container sx={{
      borderRadius: 5,
      p: 3,
      border: '2px solid #A9A9A9',
      my: 2
    }}>
      <Typography gutterBottom variant="h5" >
        Grade
      </Typography>

      <GradeTable rows={rows} columns={columns}/>
    </Container>
  )
}

export default function GradeTeacher () {

  const [isOpenCreateNewGradeComposition, setIsOpenCreateNewGradeComposition] = useState(false)

  const handleOpenCreateNewGradeComposition = () => {
    setIsOpenCreateNewGradeComposition(!isOpenCreateNewGradeComposition)
  }

  return (
    <>
      <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end'
      }}>
        <Button variant='contained' startIcon={<AddToPhotosIcon />} onClick={handleOpenCreateNewGradeComposition}>
        Create new grade
        </Button>
        <Button variant='contained' startIcon={<FileDownloadIcon />}>
        Download
        </Button>
      </Box>

      <GradeComposition />
      <StudentGrade />

      <Modal
        open={isOpenCreateNewGradeComposition}
        onClose={handleOpenCreateNewGradeComposition}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #005B48',
          boxShadow: 24,
          p: 4,
          borderRadius: '20px'
        }}>
          <Typography gutterBottom id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight:'bold' }}>
            Create new grade composition
          </Typography>

          <Box py={2}>
            <TextField id="outlined-basic" label="Grade composition title" variant="outlined" sx={{ width: '100%', pb: 2 }}/>

            <TextField type='number' label="Percentage" variant="outlined" sx={{ width: '100%' }}/>
          </Box>

          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button>
              Create
            </Button>

            <Button onClick={handleOpenCreateNewGradeComposition} color='secondary'>
              Cancel
            </Button>

          </Container>

        </Box>
      </Modal>
    </>
  )
}
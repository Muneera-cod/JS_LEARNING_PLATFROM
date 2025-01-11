import { IconHome2,IconZoomQuestionFilled,IconUsersGroup,IconUser } from '@tabler/icons-react'

export const sideBarData=[
    {
        id:1,
        icon:<IconHome2/>,
        title:'Dashboard',
        link:''
    },
    {
        id:2,
        icon:<IconUser/>,
        title:'Profile',
         link:'profile'
    },
    {
        id:3,
        icon:<IconZoomQuestionFilled/>,
        title:'Questions',
         link:'manage_questions'
    },
    {
        id:4,
        icon:<IconUsersGroup/>,
        title:'Learners',
         link:'manage_learners'
    }
]
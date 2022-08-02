
import type { NextPage } from 'next'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { Layout } from '../components/layouts';
import { EntriesList, NewEntry } from '../components/ui';


const HomePage: NextPage = () => {

 
  return (
    <Layout title="Home Open Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="pendientes" />
            <CardContent>
              {/* agregar una nueva entrada */}
              {/* Listado de entradas entrada */}
              
              <NewEntry/>
              <EntriesList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="en proceso" />
            <CardContent>
              {/* agregar una nueva entrada */}
              {/* Listado de entradas entrada */}
              <EntriesList status="in-progress" />
              
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 100px)" }}>
            <CardHeader title="terminadas" />
            <CardContent>
              {/* agregar una nueva entrada */}
              {/* Listado de entradas entrada */}
              <EntriesList status="finished" />
         
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default HomePage

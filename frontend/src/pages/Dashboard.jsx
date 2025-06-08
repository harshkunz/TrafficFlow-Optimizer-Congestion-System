import MapView from '../components/MapView';
import TrafficChart from '../components/TrafficChart';
import AlertsPanel from '../components/AlertsPanel';
import SignalState from '../components/SignalState';
import TopBar from '../components/TopBar';
 
const Dashboard = () => {
  return (
    <div className='bg-white'>
      <TopBar />
      <MapView />
      <TrafficChart />
      <AlertsPanel />
      <SignalState />
    </div>
  )
}

export default Dashboard;
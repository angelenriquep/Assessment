import React, { Component } from 'react'
import { getTime, getMetrics } from '../api'
import Loading from '../components/Loading'
import MetricsDashboard from '../components/MetricsDashboard';
import TimeDashboard from '../components/TimeDashboard';
import '../styles/Styles.css'

class Dashboard extends Component {

    intervalID = 0;

    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            time: null,
            diffTime: null,
            metrics: null,
            error: null
        };
    }

    async componentDidMount(){
            this.initialLoad()
            this.refreshEpoch()
    }

    async initialLoad(){
        this.setState({ isLoading: true });
            setTimeout(async () => {
                try {
                    const data = await getTime();
                    const metrics = await getMetrics();

                    const time = data.properties.epoch.description
                    this.setState({ time, metrics, isLoading: false });
                    
                    this.intervalID = setInterval(() => {
                        const now = new Date()  
                        const secondsSinceEpoch = Math.round(now.getTime() / 1000) 
                        const result = secondsSinceEpoch - time
                        this.setState({ diffTime: new Date(result * 1000).toISOString().substr(11, 8) })
                    }, 1000);
                }catch(error) {
                    this.setState({ error, isLoading: false });
                }
            },2000)
    }

    refreshEpoch(){
        setInterval(async () => {
            this.setState({ isLoading: true, error: null });

            setTimeout(async () => {
                try {
                    const data = await getTime();
                    const metrics = await getMetrics();

                    const time = data.properties.epoch.description
                    this.setState({ time, metrics, isLoading: false });
                
                    clearInterval(this.intervalID);
                    this.intervalID = setInterval(() => {
                        const now = new Date()  
                        const secondsSinceEpoch = Math.round(now.getTime() / 1000) 
                        const result = secondsSinceEpoch - time
                        this.setState({ diffTime: new Date(result * 1000).toISOString().substr(11, 8) })
                    }, 1000);
                }catch(error) {
                    this.setState({ error, isLoading: false });
                }
            },2000)
        }, 30000);
    }

    componentWillUnmount() {
        console.log(`Unmounting... clearing interval ${this.intervalID}`);
        clearInterval(this.intervalID);
      }

    render() {
        const { time, diffTime, metrics, isLoading, error } = this.state
    
        if(isLoading){
            return <Loading message="Loading..."/>
        }

        if(error != null){
            return <p className="error">{error.message + " trying again in 30 secs ..."}</p>
        }

        return(
            <div className="container" >
                <div className="left">
                    <div className="timmer">
                        <TimeDashboard epochTime={time} diffTime={diffTime}/>
                    </div>
                </div>
                <div className="right">
                    <MetricsDashboard metrics={metrics}/>
                </div>
            </div>
        )
    }
}

export default Dashboard;

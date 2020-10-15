import React from 'react'
import Loading from './Loading'

const TimeDashboard = ({ epochTime, diffTime }) => (
    <div>
        <div>
            Server Time: <span>{ epochTime }</span>
        </div>
        <div>
            Diff Time: <span>{ diffTime }</span>
        </div>
    </div>
)

export default TimeDashboard;

import React, { useEffect, useState } from 'react'
import { Chart } from 'react-charts'
import { getStatistics } from '../../endpoints/statistics';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
 
function MyChart() {
    const [statistics, setStatistics] = useState([
        [
            1,
            0
        ],
        [
            2,
            0
        ],
        [
            3,
            0
        ],
        [
            4,
            0
        ],
        [
            5,
            0
        ],
        [
            6,
            0
        ],
        [
            7,
            0
        ],
        [
            8,
            0
        ],
        [
            9,
            0
        ],
        [
            10,
            0
        ],
        [
            11,
            0
        ],
        [
            12,
            0
        ]
    ]);
    useEffect(() => {
        getStatistics().then(data => {
            let newSet = statistics;
            data.map(item => {
                newSet = newSet.map(set => {
                    if(item._id.month === set[0]){
                        set[1] = item.count;
                    }
                    return set;
                })
            })

            setStatistics(newSet);
        });
    }, [])
 
    const axes = React.useMemo(
        () => [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
        ],
        []
    )
 
  return (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <>
    <p><FontAwesomeIcon color="#26B1ED" icon={faSquare}/> Orders</p>
    <div
      style={{
        width: '900px',
        height: '400px'
      }}
    >
      <Chart data={[
        {
            label: 'Orders',
            data: statistics
        },
    ]} axes={axes} />
    </div>
    </>
  )
}

export default MyChart;
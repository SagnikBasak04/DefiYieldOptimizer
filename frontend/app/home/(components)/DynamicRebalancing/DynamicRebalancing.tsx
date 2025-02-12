'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, BarChart2, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import styles from './DynamicRebalancing.module.scss'

interface AllocationData {
  protocol: string
  currentAllocation: number
  suggestedAllocation: number
  icon: string
}

export default function DynamicRebalancing() {
  const [allocations, setAllocations] = useState<AllocationData[]>([])
  const [currentAPY, setCurrentAPY] = useState(0)
  const [projectedAPY, setProjectedAPY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isRebalancing, setIsRebalancing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setAllocations([
      { protocol: 'Aave', currentAllocation: 30, suggestedAllocation: 25, icon: 'https://cryptologos.cc/logos/aave-aave-logo.png' },
      { protocol: 'Compound', currentAllocation: 20, suggestedAllocation: 30, icon: 'https://cryptologos.cc/logos/compound-comp-logo.png' },
      { protocol: 'Curve', currentAllocation: 40, suggestedAllocation: 35, icon: 'https://cryptologos.cc/logos/curve-dao-token-crv-logo.png' },
      { protocol: 'Yearn', currentAllocation: 10, suggestedAllocation: 10, icon: 'https://cryptologos.cc/logos/yearn-finance-yfi-logo.png' },
    ])
    setCurrentAPY(7.5)
    setProjectedAPY(8.2)
    setIsLoading(false)
  }

  const handleRebalance = async () => {
    setIsRebalancing(true)
    // Simulate rebalancing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setAllocations(allocations.map(a => ({ ...a, currentAllocation: a.suggestedAllocation })))
    setCurrentAPY(projectedAPY)
    setIsRebalancing(false)
  }

  if (isLoading) {
    return (
      <div className={styles.dynamicRebalancing}>
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Loading allocation data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.dynamicRebalancing}>
      <h2 className={styles.title}>
        Dynamic Rebalancing
        <button onClick={fetchData} className={styles.refreshButton} disabled={isRebalancing}>
          <RefreshCw size={20} />
        </button>
      </h2>
      <div className={styles.content}>
        <div className={styles.allocationChart}>
          <BarChart2 size={120} className={styles.chartIcon} />
          {allocations.map((allocation, index) => (
            <div key={index} className={styles.allocationBar}>
              <div className={styles.protocolInfo}>
                <Image src={allocation.icon} alt={allocation.protocol} width={24} height={24} className={styles.protocolIcon} />
                <span className={styles.protocol}>{allocation.protocol}</span>
              </div>
              <div className={styles.barContainer}>
                <div 
                  className={styles.currentBar} 
                  style={{ width: `${allocation.currentAllocation}%` }}
                />
                <div 
                  className={styles.suggestedBar} 
                  style={{ width: `${allocation.suggestedAllocation}%` }}
                />
              </div>
              <span className={styles.percentage}>{allocation.suggestedAllocation}%</span>
            </div>
          ))}
        </div>
        <div className={styles.apyComparison}>
          <div className={styles.apyBox}>
            <span className={styles.label}>Current APY</span>
            <span className={styles.value}>{currentAPY.toFixed(2)}%</span>
          </div>
          <ArrowRight size={24} className={styles.arrow} />
          <div className={styles.apyBox}>
            <span className={styles.label}>Projected APY</span>
            <span className={styles.value}>{projectedAPY.toFixed(2)}%</span>
          </div>
        </div>
        <button 
          className={styles.rebalanceButton} 
          onClick={handleRebalance}
          disabled={isRebalancing}
        >
          {isRebalancing ? (
            <span>
              <RefreshCw size={20} className={styles.spinIcon} />
              Rebalancing...
            </span>
          ) : (
            'One-Click Rebalance'
          )}
        </button>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { PlusCircle, MinusCircle } from 'lucide-react'

const items = [
  { type: 'advantage', text: 'Enhances crop productivity by informing soil management decisions.' },
  { type: 'disadvantage', text: 'Requires access to technology and data for accurate predictions.' },
  { type: 'advantage', text: 'Facilitates efficient resource allocation and planning.' },
  { type: 'disadvantage', text: 'Initial costs for implementing soil testing and modeling can be high.' },
  { type: 'advantage', text: 'Enables early detection of nutrient deficiencies and soil issues.' },
  { type: 'disadvantage', text: 'Predictions may vary based on environmental changes and model accuracy.' },
  { type: 'advantage', text: 'Supports better water management and conservation efforts.' },
  { type: 'disadvantage', text: 'Complexity of soil science may lead to misinterpretations of data.' },
]

function Item({ item }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const Icon = item.type === 'advantage' ? PlusCircle : MinusCircle
  const colorClass = item.type === 'advantage' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className={`p-4 rounded-lg shadow-sm ${colorClass} flex items-start h-24`}>
        <Icon className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
        <p className="text-gray-800 font-medium line-clamp-3 overflow-hidden">{item.text}</p>
      </div>
    </div>
  )
}

export default function Component() {
  const advantages = items.filter(item => item.type === 'advantage')
  const disadvantages = items.filter(item => item.type === 'disadvantage')

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
          <span className="text-emerald-600">Advantages</span> and <span className="text-rose-600">Disadvantages</span>
          <span className="block text-2xl font-semibold mt-2 text-gray-600">of Soil Prediction</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-emerald-600 mb-6">Advantages</h2>
            <div className="space-y-4">
              {advantages.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-rose-600 mb-6">Disadvantages</h2>
            <div className="space-y-4">
              {disadvantages.map((item, index) => (
                <Item key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
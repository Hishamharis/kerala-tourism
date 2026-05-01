import { useState, useCallback } from 'react';
import { districtData } from '../../data/districts';
import { keralaDistrictPaths } from '../../data/keralaMapPaths';

export default function KeralaMap({ onHover, onSelect, selectedDistrict }) {
  const [hoveredPath, setHoveredPath] = useState(null);

  const resolveDistrictName = useCallback((rawName) => {
    const nameMap = {
      'Thiruvananthapuram': 'Thiruvananthapuram', 'Trivandrum': 'Thiruvananthapuram',
      'Kollam': 'Kollam', 'Quilon': 'Kollam',
      'Pathanamthitta': 'Pathanamthitta',
      'Alappuzha': 'Alappuzha', 'Alleppey': 'Alappuzha',
      'Kottayam': 'Kottayam', 'Idukki': 'Idukki',
      'Ernakulam': 'Ernakulam',
      'Thrissur': 'Thrissur', 'Trichur': 'Thrissur',
      'Palakkad': 'Palakkad', 'Palghat': 'Palakkad',
      'Malappuram': 'Malappuram',
      'Kozhikode': 'Kozhikode', 'Calicut': 'Kozhikode',
      'Wayanad': 'Wayanad',
      'Kannur': 'Kannur', 'Cannanore': 'Kannur',
      'Kasaragod': 'Kasaragod', 'Kasargod': 'Kasaragod',
    };
    return nameMap[rawName] || rawName;
  }, []);

  const getLabel = (name) => {
    if (name === 'Thiruvananthapuram') return 'T.Puram';
    if (name === 'Pathanamthitta') return 'P.Thitta';
    return name;
  };

  return (
    <svg
      viewBox="0 0 300 600"
      style={{
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
      }}
    >
      {keralaDistrictPaths.map((item) => {
        const name = resolveDistrictName(item.name);
        const info = districtData[name];
        const isSelected = name === selectedDistrict;
        const isHovered = name === hoveredPath;

        return (
          <g key={name}>
            <path
              d={item.d}
              className="district-path"
              data-district={name}
              fill={info?.color || '#1A6B3C'}
              fillOpacity={isSelected ? 0.9 : isHovered ? 0.8 : 0.3}
              stroke={isHovered || isSelected ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'}
              strokeWidth={isHovered || isSelected ? 1.5 : 0.5}
              cursor="pointer"
              style={{ transition: 'fill-opacity 0.2s, stroke 0.2s, stroke-width 0.2s' }}
              onMouseEnter={(e) => {
                setHoveredPath(name);
                onHover?.(name, { x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => {
                setHoveredPath(null);
                onHover?.(null);
              }}
              onClick={() => onSelect?.(name)}
            />
            <text
              x={item.cx}
              y={item.cy}
              fontSize="6.5px"
              fill="rgba(255,255,255,0.7)"
              fontFamily="var(--font-mono)"
              pointerEvents="none"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {getLabel(name)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

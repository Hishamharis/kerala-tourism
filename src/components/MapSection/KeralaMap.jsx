import { useState, useCallback } from 'react';
import { districtData } from '../../data/districts';
import { keralaDistrictPaths } from '../../data/keralaMapPaths';

export default function KeralaMap({ onHover, onSelect, selectedDistrict }) {
  const [hoveredPath, setHoveredPath] = useState(null);
  const [focusedPath, setFocusedPath] = useState(null);

  const resolveDistrictName = useCallback((rawName) => {
    const nameMap = {
      Thiruvananthapuram: 'Thiruvananthapuram',
      Trivandrum: 'Thiruvananthapuram',
      Kollam: 'Kollam',
      Quilon: 'Kollam',
      Pathanamthitta: 'Pathanamthitta',
      Alappuzha: 'Alappuzha',
      Alleppey: 'Alappuzha',
      Kottayam: 'Kottayam',
      Idukki: 'Idukki',
      Ernakulam: 'Ernakulam',
      Thrissur: 'Thrissur',
      Trichur: 'Thrissur',
      Palakkad: 'Palakkad',
      Palghat: 'Palakkad',
      Malappuram: 'Malappuram',
      Kozhikode: 'Kozhikode',
      Calicut: 'Kozhikode',
      Wayanad: 'Wayanad',
      Kannur: 'Kannur',
      Cannanore: 'Kannur',
      Kasaragod: 'Kasaragod',
      Kasargod: 'Kasaragod',
    };
    return nameMap[rawName] || rawName;
  }, []);

  const getLabel = (name) => {
    if (name === 'Thiruvananthapuram') return 'T.Puram';
    if (name === 'Pathanamthitta') return 'P.Thitta';
    return name;
  };

  const handlePathKeyDown = useCallback(
    (e, name) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.(name);
      }
    },
    [onSelect]
  );

  return (
    <svg
      role="img"
      aria-label="Interactive map of Kerala districts. Use Tab to focus a district, then Enter or Space to select."
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
        const isFocused = name === focusedPath;
        const emphasize = isHovered || isSelected || isFocused;

        return (
          <g key={name}>
            <path
              d={item.d}
              className="district-path"
              data-district={name}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${name}`}
              fill={info?.color || '#1A6B3C'}
              fillOpacity={isSelected ? 0.9 : isHovered ? 0.8 : 0.3}
              stroke={emphasize ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)'}
              strokeWidth={emphasize ? 2 : 0.5}
              cursor="pointer"
              style={{ transition: 'fill-opacity 0.2s, stroke 0.2s, stroke-width 0.2s' }}
              onFocus={() => setFocusedPath(name)}
              onBlur={() => setFocusedPath((p) => (p === name ? null : p))}
              onMouseEnter={(e) => {
                setHoveredPath(name);
                onHover?.(name, { x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => {
                setHoveredPath(null);
                onHover?.(null);
              }}
              onClick={() => onSelect?.(name)}
              onKeyDown={(e) => handlePathKeyDown(e, name)}
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

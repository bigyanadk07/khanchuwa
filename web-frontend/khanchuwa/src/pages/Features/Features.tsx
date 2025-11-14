import React from 'react';

// Component Imports
import FeatureGrid from '../../components/Features/FeatureGrid';
import PhoneSS from '../../components/Features/PhoneSS';
import CTA from '../../components/Features/CTA';

const KhanchuwaFeatures:React.FC = () => {
  return (
    <div className="min-h-screen">
      <FeatureGrid/>
      <PhoneSS/>
      <CTA/>
    </div>
  );
};

export default KhanchuwaFeatures;
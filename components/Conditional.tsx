import React from 'react';

interface IConditionalProps {
  condition: boolean;
  fallback?: React.ReactElement;
  children: React.ReactElement;
}

const Conditional = (props: IConditionalProps) => {
  const { condition, children, fallback } = props;

  if (fallback) {
    return condition ? children : fallback;
  }
  return condition ? children : null;
};

Conditional.defaultProps = {
  fallback: null,
};

export default Conditional;

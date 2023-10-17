import { useTranslation } from 'react-i18next';
const Error404 = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('error')} 404</h1>
    </>
  );
};
export default Error404;

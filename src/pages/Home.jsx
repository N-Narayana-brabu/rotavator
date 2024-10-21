import { useTranslation } from '../../node_modules/react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('welcome')}</h2>
      <p>{t('description')}</p>
    </div>
  );
}

export default Home;

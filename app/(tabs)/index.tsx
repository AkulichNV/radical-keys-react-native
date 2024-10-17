import { Image, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/chinese-calligraphy-dragon.png')}
          style={styles.calligraphyDragon}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Основные правила каллиграфии</ThemedText>
        
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Первое правило каллиграфии</ThemedText>
        <ThemedText>
          {/* Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools. */}
          Острие крюка с{' '}<ThemedText type="defaultSemiBold">"выгнутой спиной"</ThemedText> 
          должно быть направлено либо в сторону точки соединения горизонтальной и выгнутой линий, либо вертикально вверх. 
          Также вертикально вверх должно быть направлено острие крюка{' '}
          <ThemedText type="defaultSemiBold">"плывущий лебедь"</ThemedText>,{' '}
          <ThemedText type="defaultSemiBold">"китайский клевец"</ThemedText> и ломаной изогнутой с крюком.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Второе правило каллиграфии</ThemedText>
        <ThemedText>
          При изображении двух горизонтальных черт одна под другой верхняя должна быть несколько толще и короче нижней.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Третье правило каллиграфии</ThemedText>
        <ThemedText>
          Вертикальные сходящиеся точки имеют следующую особенность написания: левая точка пишется отвесно, правая - с наклоном, как маленькая откидная влево (клювовидная точка).
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Четвертое правило каллиграфии</ThemedText>
        <ThemedText>
          Левая открытая точка представляет собой маленькую откидную влево, а правая удлиненный вариант{' '}
          <ThemedText type="defaultSemiBold">"косой точки"</ThemedText>, либо{' '}
          <ThemedText type="defaultSemiBold">"длинную точку"</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Пятое правило каллиграфии</ThemedText>
        <ThemedText>
          При пересечении вертикальной и горизонтальной черт горизонтальная черта должна быть длиннее и тоньше вертикальной. Верхняя часть вертикальной имеет небольшой изгиб.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Шестое правило каллиграфии</ThemedText>
        <ThemedText>
          В ключе <ThemedText type="defaultSemiBold">"Рот"</ThemedText>{' '}
          и подобных ему графических элементах вертикальные линии должны быть толще горизонтальных; правая вертикальная линия становится немного тоньше к низу.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Седьмое правило каллиграфии</ThemedText>
        <ThemedText>
          В ключе <ThemedText type="defaultSemiBold">"Ограда"</ThemedText>{' '}
          вертикальные линии должны быть толще, чем горизонтальные; толщина их по всей длине должна быть примерно равномерной.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Восьмое правило каллиграфии</ThemedText>
        <ThemedText>
          В ключе <ThemedText type="defaultSemiBold">"Маленький"</ThemedText>{' '}
          в рукописных иероглифах левая точка должна быть почти вертикальной, правая - обыкновенной{' '}
          <ThemedText type="defaultSemiBold">"косой" точкой</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Девятое правило каллиграфии</ThemedText>
        <ThemedText>
          В ключе <ThemedText type="defaultSemiBold">"Шаг левой ногой"</ThemedText> и подобных ему графических элементах{' '}
          <ThemedText type="defaultSemiBold">"прямые короткие откидные влево"</ThemedText> должны быть менее отвесными, чем в базовой форме написания, 
          и достаточно длинными. При недостаточной длине откидных возникает ощущение дисгармонии ключа.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Десятое правило каллиграфии</ThemedText>
        <ThemedText>
          В ключе <ThemedText type="defaultSemiBold">"Дерево"</ThemedText>{' '}
          и подобных ему графических элементах откидная вправо должна начинаться чуть ниже откидной влево.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Одиннадцатое правило каллиграфии</ThemedText>
        <ThemedText>
          В ключе <ThemedText type="defaultSemiBold">"Нельзя"</ThemedText> и подобных ему графических элементов 
          необходимо при написании уделять особенное внимание правому верхнему углу и вертикальной части{' '}
          <ThemedText type="defaultSemiBold">"отвесного крюка"</ThemedText>: за счет правильной сбалансированности этой части иероглифа достигается гармония написания всего ключа.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Двенадцатое правило каллиграфии</ThemedText>
        <ThemedText>
          При написании ключа <ThemedText type="defaultSemiBold">"Вода"</ThemedText> в левой части сложных иероглифов вариант 
          с восходящей чертой используется в тех случаях, когда правая часть иероглифа заметно вытянута вверх; 
          вариант с нижней точкой предпочтителен для более широких, <ThemedText type="defaultSemiBold">"приземистых"</ThemedText> иероглифов.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Тринадцатое правило каллиграфии</ThemedText>
        <ThemedText>
          Чем сильнее вытянута вверх правая часть сложного иероглифа, тем больше стремятся элементы ключа{' '}
          <ThemedText type="defaultSemiBold">"Вода"</ThemedText> расположиться по одной вертикальной оси. 
          Тем не менее, стремление это никогда не осуществляется вполне: все три элемента ключа должны распологаться в пространстве так, чтобы внутри оставался объем,{' '}
          <ThemedText type="defaultSemiBold">"воздух"</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Четырнадцатое правило каллиграфии</ThemedText>
        <ThemedText>
          При наличии горизонтальной или вертикальной черты в левой нижней части иероглифа внизу пишется ключ{' '}
          <ThemedText type="defaultSemiBold">"Огонь"</ThemedText> с наклоненной влево крайней левой точкой; 
          если в левой нижней части иероглифа имеется откидная влево, то внизу пишется ключ{' '}
          <ThemedText type="defaultSemiBold">"Огонь"</ThemedText> со всеми четырьмя точками, наклоненными вправо.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Пятнадцатое правило каллиграфии</ThemedText>
        <ThemedText>
          В базовых формах ключей{' '}
          <ThemedText type="defaultSemiBold">"Покрышка"</ThemedText>,{' '}
          <ThemedText type="defaultSemiBold">"Десятый циклический знак"</ThemedText>,{' '}
          <ThemedText type="defaultSemiBold">"Дождь"</ThemedText> и похожих графических элементах верхняя горизонтальная черта должна быть не короче,{' '}
          чем горизонтальная часть <ThemedText type="defaultSemiBold">"окружающей черты"</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Шестнадцатое правило каллиграфии</ThemedText>
        <ThemedText>
          Ключ <ThemedText type="defaultSemiBold">"Город"</ThemedText>{' '}
          в правой части сложных иероглифов всегда пишется пропорционально чуть ниже, чем элементы слева от него.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Семнадцатое правило каллиграфии</ThemedText>
        <ThemedText>
          В ключах <ThemedText type="defaultSemiBold">"Ворота"</ThemedText>,{' '}
          <ThemedText type="defaultSemiBold">"Борьба"</ThemedText>{' '} 
          и подобных графических элементах левая вертикальная черта имеет в нижней части небольшое стремление к изгибу влево. Вертикальные линии должны быть толще горизонтальных.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Восемнадцатое правило каллиграфии</ThemedText>
        <ThemedText>
          Ключ <ThemedText type="defaultSemiBold">"Земляной вал"</ThemedText>{' '}
          в левой части сложных иероглифов всегда пишется пропорционально чуть выше, чем элементы, расположенные справа от него.
        </ThemedText>
      </ThemedView>
      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  calligraphyDragon: {
    height: 210,
    width: 190,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

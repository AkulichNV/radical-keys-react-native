import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/chinese-knot-symbol.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Основные правила порядка черт</ThemedText>
        
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Первое правило порядка черт</ThemedText>
        <ThemedText>
          Элементы иероглифа пишутся в порядке сверху вниз, слева направо и от периферии к центру.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Второе правило порядка черт</ThemedText>
        <ThemedText>
          При пересечении или примыкании откидной влево и откидной вправо сначала пишется откидная влево, а затем откидная вправо.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Третье правило порядка черт</ThemedText>
        <ThemedText>
          При пересечении горизонтальной и вертикальной черт сначала пишется горизонтальная, а затем вертикальная.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Четвертое правило порядка черт</ThemedText>
        <ThemedText>
          При примыкании точки или короткой горизонтальной к вертикальной черте сначала пишется вертикальная черта, а затем примыкающий элемент.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Пятое правило порядка черт</ThemedText>
        <ThemedText>
          При примыкании маленького охватывающего крюка либо графического элемента <ThemedText type="defaultSemiBold">"поющий сверчок"</ThemedText>{' '}
          к длинной вертикальной черте вертикальная черта пишется в последнюю очередь.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Шестое правило порядка черт</ThemedText>
        <ThemedText>
          При примыкании маленького охватывающего крюка самостоятельно или с дополнительными элементами к крюку <ThemedText type="defaultSemiBold">"плывущий лебедь"</ThemedText>{' '}
          крюк <ThemedText type="defaultSemiBold">"плывущий лебедь"</ThemedText>{' '} пишется в последнюю очередь.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Седьмое правило порядка черт</ThemedText>
        <ThemedText>
          При написании иероглифов с ключом <ThemedText type="defaultSemiBold">"Ограда"</ThemedText>{' '}
          сначала пишется графический элемент <ThemedText type="defaultSemiBold">"окружающая черта"</ThemedText>, затем элементы внутри него, затем замыкающая снизу горизонтальная.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Восьмое правило порядка черт</ThemedText>
        <ThemedText>
          При примыкании горизонтальной прямой к вертикальной снизу горизонтальная пишется в последнюю очередь.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Девятое правило порядка черт</ThemedText>
        <ThemedText>
          Если горизонтальная линия пересекает иероглиф и выдается в стороны своими концами, то она пишется в последнюю очередь.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Десятое правило порядка черт</ThemedText>
        <ThemedText>
          При пересечении графического элемента <ThemedText type="defaultSemiBold">"поющий сверчок"</ThemedText> с горизонтальной или восходящей чертой <ThemedText type="defaultSemiBold">"поющий сверчок"</ThemedText> пишется в первую очередь.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Одиннадцатое правило порядка черт</ThemedText>
        <ThemedText>
          Если вертикальная черта находится в центре иероглифа и не пересекается с другими линиями, то она пишется в первую очередь; если пересекается с другими линиями - то пишется последней.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Двенадцатое правило порядка черт</ThemedText>
        <ThemedText>
          В составе сложных иероглифов сначала пишутся элементы, находящиеся справа от ключа <ThemedText type="defaultSemiBold">"Тянуть"</ThemedText>, а затем ключ <ThemedText type="defaultSemiBold">"Тянуть"</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Тринадцатое правило порядка черт</ThemedText>
        <ThemedText>
          В иероглифах с ключом <ThemedText type="defaultSemiBold">"Лук"</ThemedText> сначала пишется лук, а затем пересекающие его вертикальные линии или примыкающие к нему откидные.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Четырнадцатое правило порядка черт</ThemedText>
        <ThemedText>
          При примыкании охватывающего или <ThemedText type="defaultSemiBold">"отвесного"</ThemedText> крюка к ломаной линии (т.е. при написании так называемой <ThemedText type="defaultSemiBold">"рамки второго типа"</ThemedText>) сначала пишется крюк, 
          а затем ломаная линия. Это же правило справедливо и для сходных графических элементов, например для сочетания ломаной линии с ломаной изогнутой с крюком и т.п. В том случае, если ломаная линия не примыкает к крюку вплотную и между их начальными точками имеются другие элементы, сначала пишется крюк, а затем ломаная линия.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Пятнадцатое правило порядка черт</ThemedText>
        <ThemedText>
          Вариант написания ключа № 162 <ThemedText type="defaultSemiBold">"Идти с остановками"</ThemedText> в левой нижней части иероглифов пишется всегда в самую последнюю очередь, 
          после других элементов иероглифа, находящихся справа от него.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Шестнадцатое правило порядка черт</ThemedText>
        <ThemedText>
          В сложном иероглифе сначала пишется ключ <ThemedText type="defaultSemiBold">"Ворота"</ThemedText>, а потом элементы внутри него.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Семнадцатое правило порядка черт</ThemedText>
        <ThemedText>
          В графическом элементе в верхней части ключа <ThemedText type="defaultSemiBold">"Сырая кожа"</ThemedText> и в других подобных графических элементах сначала пишется откидная влево, 
          а затем пересекающий ее охватывающий крюк.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Восемнадцатое правило порядка черт</ThemedText>
        <ThemedText>
          В ключах <ThemedText type="defaultSemiBold">"Лягушка"</ThemedText>, <ThemedText type="defaultSemiBold">"Черепаха"</ThemedText> и 
          подобных графических элементах сначала пишется правая вертикальная черта, а затем крюк <ThemedText type="defaultSemiBold">"Плывущий лебедь"</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Девятнадцатое правило порядка черт</ThemedText>
        <ThemedText>
          При наличии трех разных, расположенных вдоль одной горизонтальной линии непересекающихся графических элементов внутри иероглифа сначала пишется средний из них, затем левый, затем правый. 
          Если же все три элемента одинаковые, они пишутся в обычном порядке - сначала левый, затем средний, затем правый.
        </ThemedText>
      </ThemedView>
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
  reactLogo: {
    height: 220,
    width: 190,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

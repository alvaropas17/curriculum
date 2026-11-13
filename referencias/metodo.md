# Método de mejora continua: vídeos que se comparten

**Objetivo:** que cada vídeo se comparta mucho *en proporción a quien lo ve*, aunque la audiencia sea pequeña. Si la proporción es alta, el algoritmo lo enseña a gente que no te sigue, y de ahí sale la viralidad.

> Lo viral no se persigue directamente: se persigue **la tasa de envíos**, y el alcance llega como consecuencia. Instagram ha dicho públicamente que los envíos por DM son una de las señales que más pesan para mostrar un reel a quien no te sigue.

---

## 1. Métricas que mandan

Con poca audiencia, los números absolutos no dicen nada. **Todo se mide en proporción a las cuentas alcanzadas** (Insights del reel → "Cuentas alcanzadas"), o a las visualizaciones si no hay otra cosa.

| Métrica | Fórmula | Para qué sirve | Bueno | Nivel outlier* |
|---|---|---|---|---|
| **Tasa de envío** ⭐ | compartidos / alcance | Métrica principal: alcance fuera de seguidores | ≥ 1 % | ≥ 2 % |
| Tasa de guardado | guardados / alcance | Valor de referencia o inspiración | ≥ 1,5 % | ≥ 2,5 % |
| Envíos / likes | compartidos / likes | ¿Gusta o *se manda*? | ≥ 10 % | ≥ 20 % |
| Retención 3 s | % que pasa de los 3 s (Insights) | ¿Funciona el gancho? | ≥ 60 % | ≥ 75 % |
| % no seguidores | alcance a no seguidores / alcance | ¿Lo está empujando el algoritmo? | ≥ 50 % | ≥ 80 % |

\* Referencias de los outliers guardados: Change (1,9 % de envíos y 3,6 % de guardados) y Escáner (2,2 % y 2,5 %). Estos umbrales se recalibran con los datos propios (ver el paso 5).

Los comentarios **no** cuentan como objetivo, salvo en los vídeos de captación (CTA "comenta X").

---

## 2. El bucle (se repite con cada vídeo)

```
   ┌──────────────────────────────────────────────────────────┐
   ▼                                                          │
1. ALIMENTAR → 2. HIPÓTESIS → 3. CREAR → 4. MEDIR → 5. ACTUALIZAR PLAYBOOK
 (outliers)     (1 variable)   (brief)   (24h/72h/7d)   (regla confirmada / descartada)
```

### Paso 1. Alimentar: guardar outliers
- Guardar todo reel que rinda **≥ 3× la media de su cuenta** o que tenga **compartidos / vistas ≥ 1,5 %**.
- Formato: ficha en `outliers/` (plantilla abajo). Mandar a Claude la captura con las métricas + la URL + las visualizaciones.
- Variedad: como mucho 30 % de las fichas de una misma cuenta. Buscar también fuera del nicho.

### Paso 2. Hipótesis: una sola variable
- Escoger **una** regla del [playbook](playbook.md) para poner a prueba en el vídeo.
- Escribirla así: *"Si [cambio], la tasa de envío subirá por encima de [X %] porque [razón]."*
- Mantener todo lo demás igual que en tu formato base. Si cambias tres cosas a la vez, no sabrás cuál funcionó.

### Paso 3. Crear: brief antes de grabar
Rellenar el brief del experimento (plantilla abajo). Las cuatro preguntas obligatorias:
1. **¿A quién se lo mandaría alguien, y con qué mensaje?** ("esto eres tú", "mira cómo lo hizo", "tienes que probar esto"…). Si no hay respuesta, no se graba.
2. **¿Qué se ve en el primer segundo** que haga parar el scroll sin sonido?
3. **¿Qué palanca usa?** (ver el playbook: emoción universal, método sorprendente, regalo + CTA…)
4. **¿Qué variable estoy probando?**

### Paso 4. Medir: tres cortes
| Momento | Qué se apunta |
|---|---|
| **24 h** | alcance, compartidos, guardados, likes, retención a 3 s |
| **72 h** | lo mismo + % no seguidores (es la señal de si "despega") |
| **7 días** | cifras finales → se calculan las tasas → veredicto |

Mandar a Claude las capturas de Insights en cada corte. Las cifras se anotan en la ficha del experimento y en el registro.

### Paso 5. Actualizar el playbook
Según la tasa de envío a 7 días frente a **tu mediana de los últimos 10 vídeos**:
- **≥ 1,5× la mediana** → la hipótesis suma **+1 evidencia a favor**.
- **≤ 0,7× la mediana** → suma **+1 evidencia en contra**.
- Entre medias → no concluyente (se puede repetir).

Estados de cada regla en el playbook:
- 🧪 **Hipótesis**: viene solo de outliers ajenos.
- 🟡 **Prometedora**: 1–2 evidencias propias a favor.
- 🟢 **Confirmada**: 3 o más a favor y ninguna en contra en los últimos 5 intentos. Pasa al **formato base**.
- 🔴 **Descartada**: 2 o más en contra. Se archiva con la explicación.

**Recursividad:** cada regla confirmada se incorpora al formato base, y el siguiente experimento parte de ese formato mejorado. Así cada vuelta del bucle arranca desde un punto más alto.

---

## 3. Ritmo

- **Cada vídeo:** pasos 2–4.
- **Cada semana:** añadir 2–3 outliers nuevos (paso 1).
- **Cada 5 vídeos:** revisión con Claude. Recalcular medianas y umbrales, actualizar los estados del playbook y decidir las próximas 5 hipótesis.
- **Proporción:** 70 % vídeos con el formato base (lo que funciona) y 30 % experimentos arriesgados (en busca de un nuevo outlier).

---

## Plantillas

### Ficha de outlier (`outliers/<id>.md`)
```md
# Outlier: "<título/descripción>"
- URL / Cuenta / Fecha / Captura
## Métricas  (vistas, likes, comentarios, reposts, compartidos, guardados + % sobre vistas y sobre likes)
## Qué se ve
## Por qué funciona (hipótesis)
## Palanca: <emoción universal | método sorprendente | regalo+CTA | otra>
## Regla candidata para el playbook
```

### Ficha de experimento (`experimentos/AAAA-MM-DD-<slug>.md`)
```md
# Exp NN: <título>
- Fecha publicación / URL
- Palanca:
- Variable probada (1 sola):
- Hipótesis: Si ___, la tasa de envío será > ___ % porque ___.
## Brief
- ¿A quién se lo mandarían y con qué mensaje?
- Primer segundo (sin sonido):
- Descripción / CTA:
- Audio:
## Resultados
| Corte | Alcance | Compartidos | Guardados | Likes | Ret. 3 s | % no seg. | Tasa envío | Tasa guardado |
|---|---|---|---|---|---|---|---|---|
| 24 h | | | | | | | | |
| 72 h | | | | | | | | |
| 7 d  | | | | | | | | |
## Veredicto
- Frente a la mediana: ___× → a favor / en contra / no concluyente
- Aprendizaje:
- Cambio en el playbook:
```
